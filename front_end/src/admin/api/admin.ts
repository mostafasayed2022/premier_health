import { api, tokenStorage } from "./client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ─── TypeScript interfaces (نفسها بدون تغيير) ───────────────────────────

export interface SchemaFieldChoice {
  value: string | number;
  label: string;
}

export interface SchemaField {
  name: string;
  type:
    | "string"
    | "text"
    | "number"
    | "boolean"
    | "datetime"
    | "date"
    | "time"
    | "email"
    | "url"
    | "file"
    | "select"
    | "relation"
    | "nested_list"
    | "nested"
    | "multi_file";

  label: string;
  read_only: boolean;
  required: boolean;
  nullable: boolean;
  help_text?: string;
  max_length?: number;
  min_value?: number;
  max_value?: number;
  choices?: SchemaFieldChoice[];
  related_model?: string;
  related_endpoint?: string;
  related_model_qualified_name?: string;
  nested_fields?: SchemaField[];
  multiple?: boolean;
  show_in_list: boolean;
  sortable: boolean;
  searchable: boolean;
  filters?: Record<string, string | number>;
}

export interface ModelSchema {
  name: string;
  endpoint: string;
  list_display: string[];
  search_fields: string[];
  ordering: string[];
  fields: SchemaField[];
}

export interface SchemaListing {
  name: string;
  endpoint: string;
  label: string;
  url: string;
}

export interface PaginatedResponse<T> {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_superuser: boolean;
  };
}

export interface ListParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  [key: string]: string | number | boolean | undefined;
}

// ─── Auth API (مع React Query) ──────────────────────────────────────────

export const authApi = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const data = await api.post<LoginResponse>("/api/auth/login/", {
      username,
      password,
    });
    tokenStorage.set(data.access, data.refresh);
    return data;
  },

  async logout(): Promise<void> {
    const refresh = tokenStorage.getRefresh();
    if (refresh) {
      try {
        await api.post("/api/auth/logout/", { refresh });
      } catch {
        // Swallow — blacklist best-effort
      }
    }
    tokenStorage.clear();
  },
};

// ─── React Query Hooks for Auth ─────────────────────────────────────────

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => authApi.login(username, password),
    onSuccess: () => {
      // Invalidate any user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear all queries from cache
      queryClient.clear();
    },
  });
}

// ─── Schema API (مع caching أفضل) ──────────────────────────────────────

export const schemaApi = {
  async listing(): Promise<SchemaListing[]> {
    const res = await api.get<{ schemas: SchemaListing[] }>("/api/schema/");
    return res.schemas;
  },

  async getSchema(modelName: string): Promise<ModelSchema> {
    return api.get<ModelSchema>(`/api/schema/${modelName}/`);
  },
};

// ─── React Query Hooks for Schema ───────────────────────────────────────

export function useSchemaListing() {
  return useQuery({
    queryKey: ["schemas", "listing"],
    queryFn: schemaApi.listing,
    staleTime: 60_000, // 1 minute cache
  });
}

export function useSchema(modelName: string) {
  return useQuery({
    queryKey: ["schemas", modelName],
    queryFn: () => schemaApi.getSchema(modelName),
    enabled: !!modelName, // Only fetch if modelName exists
    staleTime: 60_000,
  });
}

export function useInvalidateSchemas() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () =>
      queryClient.invalidateQueries({ queryKey: ["schemas"] }),
    invalidateOne: (modelName: string) =>
      queryClient.invalidateQueries({ queryKey: ["schemas", modelName] }),
  };
}

// ─── Dynamic CRUD API (الدوال الأساسية) ──────────────────────────────

export const crudApi = {
  list<T = Record<string, unknown>>(
    endpoint: string,
    params: ListParams = {},
  ): Promise<PaginatedResponse<T>> {
    return api.get<PaginatedResponse<T>>(
      endpoint,
      params as Record<string, string | number | boolean>,
    );
  },

  get<T = Record<string, unknown>>(
    endpoint: string,
    id: number | string,
  ): Promise<T> {
    const url = endpoint.endsWith("/")
      ? `${endpoint}${id}/`
      : `${endpoint}/${id}/`;
    return api.get<T>(url);
  },

  create<T = Record<string, unknown>>(
    endpoint: string,
    data: unknown,
  ): Promise<T> {
    return api.post<T>(endpoint, data);
  },

  update<T = Record<string, unknown>>(
    endpoint: string,
    id: number | string,
    data: unknown,
  ): Promise<T> {
    const url = endpoint.endsWith("/")
      ? `${endpoint}${id}/`
      : `${endpoint}/${id}/`;
    return api.patch<T>(url, data);
  },

  delete(endpoint: string, id: number | string): Promise<null> {
    const url = endpoint.endsWith("/")
      ? `${endpoint}${id}/`
      : `${endpoint}/${id}/`;
    return api.delete<null>(url);
  },

  async fetchRelationOptions(
    relatedEndpoint: string,
  ): Promise<Array<{ value: number | string; label: string }>> {
    try {
      const res = await api.get<PaginatedResponse<Record<string, unknown>>>(
        relatedEndpoint,
        { page_size: 200 },
      );
      return res.results.map((item) => ({
        value: (item.id ?? item.pk ?? item.slug ?? "") as number | string,
        label: (item.name ??
          item.title ??
          item.username ??
          item.label ??
          String(item.id)) as string,
      }));
    } catch (error) {
      console.error("Failed to fetch relation options:", error);
      return [];
    }
  },

  upload(endpoint: string, formData: FormData): Promise<unknown> {
    return api.post(endpoint, formData);
  },
};

// ─── TanStack Query Hooks for CRUD ──────────────────────────────────────

/**
 * Hook for listing items with pagination, search, and filters
 */
export function useList<T = Record<string, unknown>>(
  endpoint: string | null,
  params: ListParams = {},
) {
  return useQuery({
    queryKey: ["list", endpoint, params],
    queryFn: () => crudApi.list<T>(endpoint!, params),
    enabled: !!endpoint, // Only fetch if endpoint is provided
    placeholderData: (previousData) => previousData, // Keep previous data while loading new page
  });
}

/**
 * Hook for fetching a single item
 */
export function useGet<T = Record<string, unknown>>(
  endpoint: string | null,
  id: number | string | null,
) {
  return useQuery({
    queryKey: ["get", endpoint, id],
    queryFn: () => crudApi.get<T>(endpoint!, id!),
    enabled: !!endpoint && id != null,
  });
}

/**
 * Hook for creating a new item
 */
export function useCreate<T = Record<string, unknown>>(endpoint: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: unknown) => crudApi.create<T>(endpoint, data),
    onSuccess: () => {
      // Invalidate the list cache for this endpoint
      queryClient.invalidateQueries({ queryKey: ["list", endpoint] });
    },
  });
}

/**
 * Hook for updating an item
 */
export function useUpdate<T = Record<string, unknown>>(endpoint: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: unknown }) =>
      crudApi.update<T>(endpoint, id, data),
    onSuccess: (_, variables) => {
      // Invalidate both list and single item cache
      queryClient.invalidateQueries({ queryKey: ["list", endpoint] });
      queryClient.invalidateQueries({
        queryKey: ["get", endpoint, variables.id],
      });
    },
  });
}

/**
 * Hook for deleting an item
 */
export function useDelete(endpoint: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => crudApi.delete(endpoint, id),
    onSuccess: () => {
      // Invalidate the list cache
      queryClient.invalidateQueries({ queryKey: ["list", endpoint] });
    },
  });
}

/**
 * Hook for fetching relation options (for dropdown menus)
 */
export function useRelationOptions(relatedEndpoint: string | null) {
  return useQuery({
    queryKey: ["relationOptions", relatedEndpoint],
    queryFn: () => crudApi.fetchRelationOptions(relatedEndpoint!),
    enabled: !!relatedEndpoint,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

/**
 * Hook for file upload
 */
export function useUpload(endpoint: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => crudApi.upload(endpoint, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", endpoint] });
    },
  });
}

/**
 * Helper hook to invalidate queries for a specific resource
 */
export function useInvalidateResource(endpoint?: string) {
  const queryClient = useQueryClient();

  return {
    invalidateList: () => {
      if (endpoint) {
        queryClient.invalidateQueries({ queryKey: ["list", endpoint] });
      }
    },
    invalidateItem: (id: number | string) => {
      if (endpoint) {
        queryClient.invalidateQueries({ queryKey: ["get", endpoint, id] });
      }
    },
    invalidateAll: () => {
      if (endpoint) {
        queryClient.invalidateQueries({ queryKey: ["list", endpoint] });
        queryClient.invalidateQueries({ queryKey: ["get", endpoint] });
      }
    },
    refetchList: () => {
      if (endpoint) {
        queryClient.refetchQueries({ queryKey: ["list", endpoint] });
      }
    },
  };
}

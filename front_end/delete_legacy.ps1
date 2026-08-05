$base = "f:\PremierCare\PremierCare\front_end\src\admin\components"
$files = @(
    "AdminShell.tsx", "LoginShell.tsx", "Sidebar.tsx",
    "Dashboard.tsx", "DashboardCharts.tsx", "DashboardClientWrapper.tsx", "BookingsTable.tsx",
    "DynamicPage.tsx", "DynamicForm.tsx", "DynamicFormFields.tsx", "DynamicTable.tsx", "NestedTable.tsx",
    "Modal.tsx", "Pagination.tsx", "Toast.tsx", "DeleteConfirm.tsx",
    "FilesPage.tsx", "useFilesPage.ts",
    "ImagePickerField.tsx", "ImagePreview.tsx", "UploadButton.tsx", "ProgressBar.tsx", "FilePickerModal.tsx"
)

foreach ($f in $files) {
    $path = Join-Path $base $f
    if (Test-Path $path) {
        Remove-Item $path -Force
        Write-Host "Deleted: $f" -ForegroundColor Green
    } else {
        Write-Host "Not found: $f" -ForegroundColor Yellow
    }
}
Write-Host "`nDone!" -ForegroundColor Cyan

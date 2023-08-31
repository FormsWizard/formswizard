import {useAppDispatch} from "project-state";
import {selectPreviewModus, togglePreviewModus, useAppSelector} from "@formswizard/state";
import {FormControl, FormControlLabel, FormGroup, FormLabel, Switch} from "@mui/material";

export const PreviewToggle = () => {
  const dispatch = useAppDispatch()
  const previewModus = useAppSelector(selectPreviewModus)
  const handleTogglePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(togglePreviewModus())
  }
  return (
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
              value="start"
              control={<Switch
                  checked={previewModus}
                  onChange={handleTogglePreview}
                  color="primary"/>}
              label="Preview"
              labelPlacement="start"
          />
        </FormGroup>
      </FormControl>
  )
}

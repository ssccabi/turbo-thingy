import { Box } from "@mui/material"
import { DrawerField } from "./DrawerField"

interface Open {
    open: 'fields' | 'sectors' | '' 
}
export function DrawerPane({open}: Open) {
    return (
        <Box>
            <DrawerField />
            <DrawerField />
            <DrawerField />
        </Box>
    )
}
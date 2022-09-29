import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const IconInput = ({ socialMedia, label, value, onChange }) => {
  return (
    <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        type="text"
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            {socialMedia === "facebook" && <FacebookIcon />}
            {socialMedia === "linkedin" && <LinkedInIcon />}
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
};

export default IconInput;

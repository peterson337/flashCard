import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AiFillSound } from "react-icons/ai";
import { Props } from "../types/ExternalSearchDropdown";

export default function ExternalSearchDropdown(props: Props) {
  const { wordToTranslate } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<SVGElement>) =>
    setAnchorEl(event.currentTarget as unknown as HTMLElement);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <AiFillSound
        className="text-2xl cursor-pointer"
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <a
          href={`https://translate.google.com/?sl=en&tl=pt&text=${wordToTranslate}&op=translate`}
          target="_blank"
        >
          <MenuItem onClick={handleClose}>Google tradutor</MenuItem>
        </a>
        <a
          href={`https://www.google.com/search?q=how+how+to+pronounce+${wordToTranslate}&oq=how&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIHCAEQLhiABDIGCAIQRRg9MgYIAxBFGD0yBggEEEUYPTIGCAUQRRhBMgYIBhBFGEEyBggHEEUYQdIBCDEwMDdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8`}
          target="_blank"
        >
          <MenuItem onClick={handleClose}>How to pronounce</MenuItem>
        </a>
      </Menu>
    </>
  );
}

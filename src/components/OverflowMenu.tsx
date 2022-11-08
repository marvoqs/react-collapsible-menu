import React, { useState, useMemo } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// @ts-ignore
import classnames from "classnames";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  inOverflowMenu: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

interface Props {
  children: React.ReactNode;
  className?: string;
  visibilityMap?: any;
}

const OverflowMenu: React.FC<Props> = ({
  children,
  className,
  visibilityMap,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const shouldShowMenu = useMemo(
    () => Object.values(visibilityMap).some((v) => v === false),
    [visibilityMap]
  );

  if (!shouldShowMenu) {
    return null;
  }

  return (
    <div className={className}>
      <MenuItem onClick={handleClick}>Show more</MenuItem>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {React.Children.map(children, (child) => {
          // @ts-ignore
          if (!visibilityMap[child.props["data-targetid"]]) {
            return (
              // @ts-ignore
              <MenuItem key={child} onClick={handleClose}>
                {/* @ts-ignore */}
                {React.cloneElement(child, {
                  className: classnames(
                    // @ts-ignore
                    child.className,
                    classes.inOverflowMenu
                  ),
                })}
              </MenuItem>
            );
          }
          return null;
        })}
      </Menu>
    </div>
  );
};

export default OverflowMenu;

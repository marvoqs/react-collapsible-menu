import React from "react";
import styled from "styled-components";

import MenuItem from "./MenuItem";

interface Props {
  children: React.ReactNode;
  visibilityMap?: any;
}

const OverflowMenu: React.FC<Props> = ({ children, visibilityMap }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOverflowMenuOpen = !!anchorEl;

  const handleClose = () => setAnchorEl(null);
  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);

  const shouldShowMenu = React.useMemo(
    () => Object.values(visibilityMap).some((v) => v === false),
    [visibilityMap]
  );

  if (!shouldShowMenu) {
    return null;
  }

  return (
    <>
      <StyledOpenButtonWrapper>
        <MenuItem isVisible={!isOverflowMenuOpen} onClick={handleOpen}>
          Show more
        </MenuItem>
      </StyledOpenButtonWrapper>

      <StyledOverflowMenu isOpen={isOverflowMenuOpen}>
        <button onClick={handleClose}>Close</button>

        {React.Children.map(children, (childItem, index) => {
          const child = childItem as React.ReactElement;

          if (!!visibilityMap[child.props["data-targetid"]]) return null;

          return React.cloneElement(child, {
            key: index,
            isVisible: true,
          });
        })}
      </StyledOverflowMenu>
    </>
  );
};

interface StyledOverflowMenuProps {
  isOpen?: boolean;
}

const StyledOverflowMenu = styled.div<StyledOverflowMenuProps>`
  position: absolute;
  top: 2rem;
  z-index: 1;

  display: ${(props) => (!!props.isOpen ? "block" : "none")};
`;

const StyledOpenButtonWrapper = styled.div`
  display: inline-flex;

  position: sticky;
  order: 99;
  right: 0;

  background-color: white;
`;

export default OverflowMenu;

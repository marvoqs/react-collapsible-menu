import styled, { css } from "styled-components";

interface MenuItemProps {
  isVisible?: boolean;
}

const MenuItem = styled.div<MenuItemProps>`
  display: inline-flex;
  flex: 0 0 auto;
  padding: 0.85rem;
  font-style: italic;

  ${(props) =>
    !!props.isVisible
      ? css`
          order: 0;
          visibility: visible;
          opacity: 1;
        `
      : css`
          order: 100;
          visibility: hidden;
          pointer-events: none;
        `}
`;

export default MenuItem;

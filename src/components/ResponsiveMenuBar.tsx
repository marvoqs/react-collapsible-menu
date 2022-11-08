import React from "react";
import styled from "styled-components";

import OverflowMenu from "./OverflowMenu";

interface VisibilityMapType {
  [targetid: string]: boolean;
}

interface Props {
  children: React.ReactNode;
}

const ResponsiveMenuBar: React.FC<Props> = ({ children }) => {
  const navRef = React.useRef<HTMLDivElement>(null);

  const [visibilityMap, setVisibilityMap] = React.useState<VisibilityMapType>(
    {}
  );

  const handleIntersection: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    const updatedEntries: VisibilityMapType = {};

    entries.forEach((entry) => {
      const targetid = (entry.target as HTMLElement).dataset.targetid;
      if (!targetid) return;

      updatedEntries[targetid] = entry.isIntersecting;
    });

    setVisibilityMap((prevState) => ({
      ...prevState,
      ...updatedEntries,
    }));
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: navRef.current,
      threshold: 1,
    });

    const navRefCurrent = navRef.current;

    if (!navRefCurrent) return;

    const items = navRefCurrent.children as HTMLCollectionOf<HTMLElement>;

    Array.from(items).forEach((item) => {
      if (item.dataset.targetid) {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <StyledResponsiveMenuBar ref={navRef}>
      {React.Children.map(children, (childItem) => {
        const child = childItem as React.ReactElement;

        return React.cloneElement(child, {
          isVisible: !!visibilityMap[child.props["data-targetid"]],
        });
      })}
      <OverflowMenu visibilityMap={visibilityMap}>{children}</OverflowMenu>
    </StyledResponsiveMenuBar>
  );
};

const StyledResponsiveMenuBar = styled.div`
  display: flex;
  overflow: hidden;
  padding: 0 20px;
  width: 75%;
`;

export default ResponsiveMenuBar;

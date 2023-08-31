import { useState } from "react";
import classNames from "classnames";
import "./common-accordion.scss";

interface ICommonAccordionProps {
  content: JSX.Element;
  expandedContent: JSX.Element;
  expanderLabel?: string;
  expanderNotAvailable?: boolean;
}

export default function CommonAccordion({
  content,
  expandedContent,
  expanderLabel,
  expanderNotAvailable,
}: ICommonAccordionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div className="c-CommonAccordion">
      <div className="c-CommonAccordion__ContentRow">
        <div
          className="c-CommonAccordion__ContentRow_content"
          data-testid="accordion-content"
        >
          {content}
        </div>
        {!expanderNotAvailable && (
          <div
            className="c-CommonAccordion__ContentRow_expander"
            onClick={() => setIsExpanded(!isExpanded)}
            data-testid="accordion-expander"
          >
            {expanderLabel && (
              <span className="c-CommonAccordion__ContentRow_expander_label">
                {expanderLabel}
              </span>
            )}
            <span
              className={classNames(
                "c-CommonAccordion__ContentRow_expander_icon",
                {
                  ["c-CommonAccordion__ContentRow_expander_iconExpanded"]:
                    isExpanded,
                },
              )}
            />
          </div>
        )}
      </div>
      {!expanderNotAvailable && isExpanded && (
        <div
          className="c-CommonAccordion__ExpandedContent"
          data-testid="accordion-expandedContent"
        >
          {expandedContent}
        </div>
      )}
    </div>
  );
}

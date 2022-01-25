import { Fragment, useState } from "react";
import { AssociationGraph } from "./AssociationGraph";

// Renders data for an association in a table row.
const Association = (props) => {
  const { association_score, target } = props;
  // Controls graph visibility.
  const [isExpanded, setExpanded] = useState(false);
  // Template string for generating links to target molecule profile pages.
  const url = `https://platform.opentargets.org/target/${target.id}`;
  const expandIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
  const collapseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 12H4"
      />
    </svg>
  );

  function clickHandler() {
    // Toggle graph visibility.
    setExpanded(!isExpanded);
  }

  return (
    <Fragment>
      <tr>
        <td className="associations-table-btn">
          <button
            className="graph-button"
            onClick={clickHandler}
            title="Toggle graph view"
          >
            {isExpanded ? collapseIcon : expandIcon}
          </button>
        </td>
        <td className="associations-table-td">
          <a href={url} target="_blank" rel="noreferrer">
            {target.gene_info.symbol}
          </a>
        </td>
        <td className="associations-table-td">{target.gene_info.name}</td>
        <td className="associations-table-td">{association_score.overall}</td>
      </tr>
      {isExpanded && <AssociationGraph association_score={association_score} />}
    </Fragment>
  );
};

export { Association };

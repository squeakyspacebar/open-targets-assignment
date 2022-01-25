import { gql, useQuery } from "@apollo/client";
import { Fragment } from "react";
import { Association } from "./Association.jsx";

// Define GraphQL query for association data.
const ASSOCIATIONS = gql`
  query Associations {
    associations {
      id
      association_score {
        overall
        datatypes {
          literature
          rna_expression
          genetic_association
          somatic_mutation
          known_drug
          animal_model
          affected_pathway
        }
      }
      target {
        id
        gene_info {
          symbol
          name
        }
      }
    }
  }
`;

// Renders a data table of the top 5 given target-disease associations.
const AssociationsTable = () => {
  // Query for association data using Apollo Client.
  const { loading, error, data } = useQuery(ASSOCIATIONS);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: ({error.message})</p>;
  }

  // Sort data by association score (desc) and use only the top 5 results.
  const sortedAssociations = [...data.associations]
    .sort((a, b) =>
      a.association_score.overall < b.association_score.overall ? 1 : -1
    )
    .slice(0, 5);

  const columnNames = [
    "Approved Symbol",
    "Gene Name",
    "Overall Association Score",
  ];

  const ColumnHeadersFragment = (
    <Fragment>
      <th></th>
      {columnNames.map((columnName, index) => (
        <th key={index} scope="col" className="associations-table-th">
          {columnName}
        </th>
      ))}
    </Fragment>
  );

  const associationsFragment = sortedAssociations.map(
    ({ association_score, target }) => {
      return (
        <Association
          key={target.id}
          association_score={association_score}
          target={target}
        />
      );
    }
  );

  return (
    <div className="table-wrapper">
      <table className="associations-table">
        <thead>
          <tr>{ColumnHeadersFragment}</tr>
        </thead>
        <tbody>{associationsFragment}</tbody>
      </table>
    </div>
  );
};

export { AssociationsTable };

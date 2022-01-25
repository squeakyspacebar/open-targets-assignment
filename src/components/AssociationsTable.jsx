import { gql, useQuery } from "@apollo/client";
import { Association } from "./Association.jsx";

// Define GraphQL query for association data.
const ASSOCIATIONS_QUERY = gql`
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
  const { loading, error, data } = useQuery(ASSOCIATIONS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error :</p>;
  }

  // Sort data by association score (desc) and use only the top 5 results.
  const sortedAssociations = [...data.associations]
    .sort((a, b) =>
      a.association_score.overall < b.association_score.overall ? 1 : -1
    )
    .slice(0, 5);

  const columnNames = [
    "",
    "Approved Symbol",
    "Gene Name",
    "Overall Association Score",
  ];

  const ColumnHeadersFragment = columnNames.map((columnName, index) => {
    return (
      <th
        key={index}
        scope="col"
        className={columnName ? "associations-table-th" : ""}
      >
        {columnName}
      </th>
    );
  });

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

import { gql, useQuery } from "@apollo/client";

const ASSOCIATIONS_QUERY = gql`
  query Associations {
    associations {
      is_direct
      id
      evidence_count {
        total
        datasources {
          progeny
          sysbio
          expression_atlas
          europepmc
          intogen
          phewas_catalog
          uniprot_literature
          phenodigm
          eva
          gene2phenotype
          gwas_catalog
          slapenrich
          genomics_england
          postgap
          uniprot
          chembl
          cancer_gene_census
          reactome
          uniprot_somatic
          eva_somatic
          crispr
        }
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
      disease {
        id
        efo_info {
          label
          path
          therapeutic_area {
            codes
            labels
          }
        }
      }
      association_score {
        overall
        datasources {
          progeny
          sysbio
          expression_atlas
          europepmc
          intogen
          phewas_catalog
          uniprot_literature
          phenodigm
          eva
          gene2phenotype
          gwas_catalog
          slapenrich
          genomics_england
          postgap
          uniprot
          chembl
          cancer_gene_census
          reactome
          uniprot_somatic
          eva_somatic
          crispr
        }
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
        tractability {
          antibody {
            top_category
            categories {
              predicted_tractable_med_low_confidence
              clinical_precedence
              predicted_tractable_high_confidence
            }
            buckets
          }
          smallmolecule {
            top_category
            small_molecule_genome_member
            high_quality_compounds
            ensemble
            categories {
              predicted_tractable_med_low_confidence
              clinical_precedence
              predicted_tractable_high_confidence
            }
            buckets
          }
        }
      }
    }
  }
`;

const AssociationsTable = () => {
  const { loading, error, data } = useQuery(ASSOCIATIONS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error :</p>;
  }

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

  const associationsFragment = data.associations.map(
    ({ association_score, target }) => {
      const url = `https://platform.opentargets.org/target/${target.id}`;

      return (
        <tr key={target.id}>
          <td>
            <button class="graph-button">
              <div>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </div>
            </button>
          </td>
          <td className="associations-table-td">
            <a href={url}>{target.gene_info.symbol}</a>
          </td>
          <td className="associations-table-td">{target.gene_info.name}</td>
          <td className="associations-table-td">{association_score.overall}</td>
        </tr>
      );
    }
  );

  return (
    <div>
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

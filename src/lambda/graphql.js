import { ApolloServer, gql } from "apollo-server-lambda";
import fs from "fs";

// Load associations data from JSON file.
const rawData = fs.readFileSync("data/associations.json");
const parsedData = JSON.parse(rawData);
const associations = parsedData["data"];

// Define GraphQL types.
const typeDefs = gql`
  type Datasources {
    progeny: Float
    sysbio: Float
    expression_atlas: Float
    europepmc: Float
    intogen: Float
    phewas_catalog: Float
    uniprot_literature: Float
    phenodigm: Float
    eva: Float
    gene2phenotype: Float
    gwas_catalog: Float
    slapenrich: Float
    genomics_england: Float
    postgap: Float
    uniprot: Float
    chembl: Float
    cancer_gene_census: Float
    reactome: Float
    uniprot_somatic: Float
    eva_somatic: Float
    crispr: Float
  }

  type Datatypes {
    literature: Float
    rna_expression: Float
    genetic_association: Float
    somatic_mutation: Float
    known_drug: Float
    animal_model: Float
    affected_pathway: Float
  }

  type EvidenceCount {
    total: Float
    datasources: Datasources
    datatypes: Datatypes
  }

  type TherapeuticArea {
    codes: [String]
    labels: [String]
  }

  type EfoInfo {
    label: String
    path: [[String]]
    therapeutic_area: TherapeuticArea
  }

  type Disease {
    id: String
    efo_info: EfoInfo
  }

  type AssociationScore {
    overall: Float
    datasources: Datasources
    datatypes: Datatypes
  }

  type GeneInfo {
    symbol: String
    name: String
  }

  type Categories {
    predicted_tractable_med_low_confidence: Float
    clinical_precedence: Float
    predicted_tractable_high_confidence: Float
  }

  type Antibody {
    top_category: String
    categories: Categories
    buckets: [Int]
  }

  type Smallmolecule {
    top_category: String
    small_molecule_genome_member: Boolean
    high_quality_compounds: Int
    ensemble: Float
    categories: Categories
    buckets: [Int]
  }

  type Tractability {
    antibody: Antibody
    smallmolecule: Smallmolecule
  }

  type Target {
    id: String
    gene_info: GeneInfo
    tractability: Tractability
  }

  type Association {
    is_direct: Boolean
    id: String
    evidence_count: EvidenceCount
    disease: Disease
    association_score: AssociationScore
    target: Target
  }

  type Query {
    associations: [Association]
  }
`;

// Define GraphQL resolvers.
const resolvers = {
  Query: {
    associations: () => associations,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Generate handler function to export for AWS Lambda.
// https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html
const serverHandler = server.createHandler({
  cors: {
    origin: "*",
  },
});

const handler = (event, context, callback) => {
  return serverHandler(
    {
      ...event,
      requestContext: event.requestContext || {},
    },
    context,
    callback
  );
};

export { handler };

import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
//
const useRepositories = ({
  orderBy = "CREATED_AT", //for sorting repositories by creation date
  orderDirection = "DESC",
} = {}) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { orderBy, orderDirection },
  });

  //  edges -> node
  const repositories = data?.repositories.edges.map((edge) => edge.node) ?? [];

  return {
    repositories,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;

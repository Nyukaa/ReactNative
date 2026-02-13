import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
//
const useRepositories = ({
  orderBy = "CREATED_AT", //for sorting repositories by creation date
  orderDirection = "DESC",
  searchKeyword = "",
  first = 3,
  after,
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { orderBy, orderDirection, searchKeyword, first, after },
  });
  // allows to fetch more data when we reach the end of the list,
  // it takes an object with the same variables as the query, but we need to pass the after variable to get the next page of data
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy,
        orderDirection,
        searchKeyword,
        first,
      },
    });
  };
  //  edges -> node
  //const repositories = data?.repositories.edges.map((edge) => edge.node) ?? [];

  return {
    repositories: data?.repositories,
    loading,
    error,
    fetchMore: handleFetchMore,
    //refetch, every time we call refetch, it will use the variables that were used in the last query, so we don't need to pass them again
  };
};

export default useRepositories;

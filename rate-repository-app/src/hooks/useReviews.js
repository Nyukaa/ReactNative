import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useReviews = ({ repositoryId, first = 3 }) => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId, first },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;
    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    repository: data?.repository,
    reviews: data?.repository?.reviews,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useReviews;

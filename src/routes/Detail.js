import React from "react"
import { useParams } from "react-router-dom"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import styled from "styled-components"

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`

const Description = styled.p`
  font-size: 28px;
`

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`
export default () => {
  let { id } = useParams()
  id = Number(id)
  const { loading, data } = useQuery(GET_MOVIE, { variables: { id } })
  console.log(data)
  return (
    <>
      <Container>
        <Column>
          <Title>{loading ? "loading.." : `${data.movie.title} ${data.movie.isLiked ? "❤️" : "😢"}`}</Title>
          <>
            <Subtitle>
              {data?.movie?.language} · {data?.movie?.rating}
            </Subtitle>
            <Description>{data?.movie?.description_intro}</Description>
          </>
        </Column>
        {/* optional chaining 은 */}
        {/* bg={data && data.movie ? data.movie.medium_cover_image : ""} */}
        {/* bg={data?.movie?.medium_cover_image} 위에것과 같게 만들어줌 */}
        <Poster bg={data?.movie?.medium_cover_image} />
        {/* {data && data.suggestions && data.suggestions.map()} */}
        {/* {data?.suggestions?.map(m=> m)} */}
      </Container>
    </>
  )
}

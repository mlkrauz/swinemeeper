import React from 'react'
import { Container } from '../components/Container/Container'
import { Swinemeeper } from '../components/Game/Swinemeeper'

export const Home: React.FC = () => {
  return (
    <>
      <Container { ...{ title: 'SWINEMEEPER', largeTitle: true } }>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor consequat id porta nibh venenatis cras. Porta nibh venenatis cras sed felis. Ac felis donec et odio pellentesque diam volutpat. Duis at tellus at urna condimentum mattis pellentesque id. Lacinia quis vel eros donec ac odio. Congue nisi vitae suscipit tellus. Velit euismod in pellentesque massa placerat duis ultricies lacus. Odio facilisis mauris sit amet. Nibh sed pulvinar proin gravida hendrerit lectus. Viverra orci sagittis eu volutpat.
        </p>
      </Container>
      <Container { ...{ title: 'HOW TO PLAY' } }>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et tortor consequat id porta nibh venenatis cras. Porta nibh venenatis cras sed felis. Ac felis donec et odio pellentesque diam volutpat. Duis at tellus at urna condimentum mattis pellentesque id. Lacinia quis vel eros donec ac odio. Congue nisi vitae suscipit tellus. Velit euismod in pellentesque massa placerat duis ultricies lacus. Odio facilisis mauris sit amet. Nibh sed pulvinar proin gravida hendrerit lectus. Viverra orci sagittis eu volutpat.
        </p>
      </Container>
      <Container>
        <Swinemeeper />
      </Container>
    </>
  )
}
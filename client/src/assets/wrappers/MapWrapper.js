import styled from "styled-components";

const Wrapper = styled.section`
  padding: 2rem 1.5rem;

  .leaflet-container {
    height: 90vh;
    width: 90wh;
    z-index: 0; /* Lower z-index value */
  }
`;
export default Wrapper;

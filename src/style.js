import styled from 'styled-components';

const pallete = {
  tests: {
    passed: 'green',
    failed: 'red',
    running: 'gray',
    notStarted: 'black',
    default: 'black'
  }
}

export const TestWrapper = styled.div`
  border-left: 5px solid ${(props) => pallete.tests[props.status] || pallete.tests.default}
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

export const TestStatus = styled.div`
  color: ${(props) => pallete.tests[props.status] || pallete.tests.default}
  font-weight: 700;
`;

export const TestDescription = styled.div`
  margin-left: 10px;
`;

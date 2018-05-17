import styled from 'styled-components';

const pallete = {
  text: {
    light: '#fff'
  },
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
`;

export const TestStatus = styled.div`
  background-color: ${(props) => pallete.tests[props.status] || pallete.tests.default}
  color: ${pallete.text.light};
  font-weight: 700;
  padding: 20px 0;
  width: 120px;
`;

export const TestDescription = styled.div`
  padding: 20px 20px 20px 0;
  margin-left: 20px;
`;

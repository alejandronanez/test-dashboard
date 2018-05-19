import styled from 'styled-components';

const pallete = {
  base: {
    lightGray: '#f4f4f4'
  },
  text: {
    light: '#fff'
  },
  tests: {
    passed: '#63b867',
    failed: '#e67777',
    running: '#b6b266',
    notStarted: '#3d3939',
    default: '#3d3939'
  }
}

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 90%;
  margin: 30px auto 0;
`;

export const TestsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const TestWrapper = styled.div`
  border: 1px solid ${pallete.base.lightGray};
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

export const TestStatus = styled.div`
  background-color: ${props => pallete.tests[props.status] || pallete.tests.default};
  color: ${pallete.text.light};
  font-weight: 700;
  padding: 20px 0 20px 20px;
  transition: background-color 2s;
  width: 120px;
`;

export const TestDescription = styled.div`
  padding: 20px 20px 20px 0;
  margin-left: 20px;
`;

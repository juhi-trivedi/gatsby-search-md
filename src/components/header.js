import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StyledLink from '../utils/styled-link';
import media from '../utils/media';

import Search from "./search"
import { StaticQuery } from "gatsby"

const Container = styled.nav`
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  margin: 0;

  ${media.phone`
    text-align: center;
  `}
`;

const Header = ({ title }) => (
    <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <div className="header">
        <Container>
          <StyledLink to={'/'}>
            <Title>{title}</Title>
          </StyledLink>
        </Container>
        <Search searchIndex={data.siteSearchIndex.index} />
      </div>
    )}
  />
);

Header.defaultProps = {
  title: '',
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;

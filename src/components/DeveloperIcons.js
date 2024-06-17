import React, { useState } from 'react';
import styled from '@emotion/styled';

import icons from '../data/developer-icons.json';
console.log(icons);

const tuples = Object.entries(icons);
const DeveloperIcons = () => {
  const [viewMode, setViewMode] = useState('grid');

  const iconsView =
    viewMode === 'grid' ? (
      <Grid>
        {tuples.map(([name, svg]) => (
          <li>
            <p>{name}</p>
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          </li>
        ))}
      </Grid>
    ) : (
      <List>
        {tuples.map(([name, svg]) => (
          <div>
            <dt>{name}</dt>
            <dd dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        ))}
      </List>
    );

  return (
    <Container>
      <fieldset>
        <legend>View:</legend>
        <div>
          <input
            checked={viewMode === 'list'}
            id="list"
            onChange={(e) => setViewMode(e.target.value)}
            type="radio"
            value="list"
          />
        </div>
        <div>
          <input
            checked={viewMode === 'grid'}
            id="grid"
            onChange={(e) => setViewMode(e.target.value)}
            type="radio"
            value="grid"
          />
        </div>
      </fieldset>

      {iconsView}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 1rem 4rem;

  .dark-mode && svg {
    fill: #fff;
  }

  & fieldset {
    border: 0;
    display: flex;
    gap: 2rem;
    justify-content: end;
    padding: 1rem 6rem;
  }

  /* styling legends is weird. 
   * float: left here is what causes the legend not to render on the fieldset's border.
   * https://morgan.cugerone.com/blog/how-to-make-a-fieldset-legend-inline/
   */
  & legend {
    display: block;
    float: left;
  }

  & input[type='radio'] {
    appearance: none;
    height: 1.5rem;
    width: 1.5rem;

    &:checked {
      background: blue;
    }
  }

  & svg {
    height: 100%;
    width: 100%;
  }
`;

const Grid = styled.ul`
  --icon-size: 2.5rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, var(--icon-size));
  list-style: none;
  padding: 0;

  & li {
    display: flex;
    justify-content: center;
    margin: 0;
    position: relative;
    width: var(--icon-size);
  }
  & li div {
    width: 100%;
  }

  & p {
    bottom: 0;
    display: none;
    margin: 0;
    position: absolute;
  }

  & li:hover p {
    display: block;
  }
`;

const List = styled.dl`
  & > div {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 0.5rem;
  }

  @media (width < 750px) {
    & > div {
      display: block;
    }
    dt {
      margin-bottom: 1rem;
    }
  }

  & > div:nth-of-type(odd) {
    background: #eee;
  }

  & dd {
    width: 2rem;
  }
  & dt {
    word-break: break-all;
  }
`;

export default DeveloperIcons;

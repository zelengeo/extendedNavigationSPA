import { gql } from 'apollo-boost';

export const getPublications = () => gql`
  {
    publications {
      _id
      tags
      date
      root {
        _id
        title
        synopsis
      }
    }
  }
`;
export const getWholePublication = id => gql`
    {
        publication(_id: "${id}"){
            _id
            tags
            date
            root {
                ...ChildrenRecusive
            }
        }
    }
    fragment ChildrenRecusive on Node {
        children {
            ...ChildFields
            children {
                ...ChildFields
                children {
                    ...ChildFields
                    children {
                        ...ChildFields
                        children {
                            ...ChildFields
                        }
                    }
                }
            }
        }
    }

    fragment ChildFields on Node {
        _id
        title
        synopsis
        content
    }
`;

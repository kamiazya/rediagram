import { Plugin } from '@ts-graphviz/mdx';
import { Diagram } from '../components/Diagram';
import { MDXDiagram } from './components/MDXDiagram';
import { TextBox } from '../components/TextBox';

export const CommonPlugin: Plugin = {
  mdx: {
    Diagram: MDXDiagram,
  },
  graphviz: {
    Diagram,
    TextBox,
  },
};

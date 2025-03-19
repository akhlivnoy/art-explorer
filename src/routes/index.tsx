import { createFileRoute } from '@tanstack/react-router';

import {
  BlockQuote,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Large,
  Lead,
  List,
  MultilineCode,
  Muted,
  P,
  Small,
} from '@/components/ui/typography';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-start gap-2 px-10 py-5">
      <H1>H1: Heading</H1>
      <H2>H2: Heading</H2>
      <H3>H3: Heading</H3>
      <H4>H4: Heading</H4>
      <P>Paragraph: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, beatae!</P>
      <BlockQuote>
        BlockQuote: Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, eligendi!
      </BlockQuote>
      <List>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </List>
      <InlineCode>InlineCode: @tanstack/react-router</InlineCode>
      <Lead>Lead: Lorem ipsum dolor sit amet.</Lead>
      <Large>Large: Lorem, ipsum dolor.</Large>
      <Small>Small: Lorem, ipsum dolor.</Small>
      <Muted>Muted: Lorem, ipsum dolor.</Muted>
      <MultilineCode className="w-full">
        MultilineCode: Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem necessitatibus dicta atque assumenda
        aliquid magni ex ipsam, nulla laboriosam voluptates.
      </MultilineCode>
    </div>
  );
}

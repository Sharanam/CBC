import Container from "../../common/lib/layout/Container";
import { Highlighter } from "../../common/lib/styledElements/Index";

export default function ViewReportings() {
  return (
    <Container>
      <h1>Manage Reportings</h1>
      <h3>
        <Highlighter>Under Development</Highlighter>
      </h3>
      <p>
        Master, here, can provide us the details of the
        <ul>
          <li>route</li>
          <li>time</li>
          <li>number of passengers</li>
          <li>bus service type</li>
          <li>maximum seats</li>
        </ul>
        which, later on, admin can send to the server.
      </p>
      <p>reports will be generated based on these reportings</p>
    </Container>
  );
}

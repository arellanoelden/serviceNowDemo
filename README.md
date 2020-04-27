## `Run the app with 'yarn start'`

Runs the app in the development mode.
Open [http://localhost:8082](http://localhost:8082) to view it in the browser.

## `Components`

### `Incident Provider`

This provider handles all of the actual calls to the endpoints. It will handle getting all incidents, incidents by state, incidents by number, and adding an incident. If any future endpoint calls are added in the future such as delete or any other gets involving incidents it should go in this component

### `All`

This component is simply a container for our homepage and will hold the `IncidentCard` container and ask the provider to get all incidents and use `IncidentTable` to display them

### `AddIncident`

This component has a form that lists out properties to be set for the new attribute(will automatically set the number, created on and state).

### `Filtered`

Similar to the `All` component but this `Filtered` component will ask the provider for a filtered list of incidents based off of the incident state in the url

### `Incident`

This component is used to display a single incident in a list. The additional information that this holds in comparison to the details seen when an incident is in the table is the `description` value

### `IncidentCard`

This is the card component for the incidents where it will have the `label` and `count`. In our case we pass states(Open, closed..) and state numbers(Ex: 5 open cases) to this card component, however all this component cares about is a `label` and a `count` it does not need to be a state passed into it if it is needed in the future for other cases

### `IncidentTable`

This is the table component used for the default and filtered page. This table will simply take in a list of incidents and display them in the table. It does not care if the list is a filtered list or not as it will simply populate the table with the information it is given

## `External Tools`

### `Component Library`

This app was largely created(the card component is not built with this library) with the [Material-UI](https://material-ui.com/) React component library. As such this App was built using React as well as sass.

### `Formatter`

The `prettier` package for formatting was used with this project as well to ensure a consistent coding style.

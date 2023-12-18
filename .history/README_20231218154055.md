## Installation

You'll need to install Node.js >= v14.16+ and yarn

Clone the repository with the following command: `git clone https://github.com/martinfeher/convex-tech-test-react-ts.git` 
Use terminal and navigate to the project root.

Then run : `yarn install` to install dependencies

Then run : `yarn start` to rund the project in dev mode

Now, in the browser go to localhost:3000

For Production Build Run : `yarn build`

The command will generate a build folder in the root of your template that you can upload to your server.

## Description
The repository has been developed based on the starter project GitHub - infinityworks/iw-tech-test-react-ts following the instructions https://handbook.infinityworks.com/running-iw/recruitment/elaborations/full-stack-user-story-and-elaboration 

### Selecting the local authority
The local authority can be selected in the Drop-down list, it allows the user to type text to filter the local authorities.
The results are displayed in the table with the list of establishments in the the local authority and the rating percentage.

### Ordering
The data are ordered based on the 2 examples of schemes in England and Scotland.

### Pagination
The results have implemented pagination.
The api to retrieve the establishments in the selected local authority according to https://api.ratings.food.gov.uk/Help/Index#Establishments is using api call: http://api.ratings.food.gov.uk/Establishments?localAuthorityId=localAUthorityId.
The mentioned pageSize in the implementation notes is not a part of this Rest Api endpoint. 
It does not allow pagination on the server side via Rest Api when the authority is selected, it has been tested.
The pagination with working page size parameter is done on client side via React Javascript as a working solution.
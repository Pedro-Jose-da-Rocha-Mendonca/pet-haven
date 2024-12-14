# INST377 Group Project: Pet Adoption Website

- **Group Members**: Fadel Muzahdi, David Lin, Fatima Castillo, Pedro José da Rocha Mendonça, Rheymar Devera
- **Title**: Pet Haven
- **Project Description**: Our project goal is to combat the increasing problem of overcrowding in shelters around the United States. To achieve this, we leverage the use of the Rescue Groups API to obtain information about animal rescue groups, donation centers, and most importantly, pets. With this API, we created a comprehensive and user-friendly website for users looking to donate to the cause or adopt a pet.
- **Target Browsers Description**: Our project is best utilized using computers with Google Chrome. However, it will also be available to be used, although not as optimal, through devices with iOS, or Android.
- [Go to Developer Manual](#developer-manual)

---

## Developer Manual
### Installation

1. Clone the repository on your local directory:
```
git clone https://github.com/DavidLin29/INST-377-Pet-Project.git
```
2. Open the project directory:
```
For example: cd ./INST-377-Pet-Project.git
```
3. Ensure that Node.JS is installed. If not, use the link below to follow instructions regarding installation:
```
https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/
```
4. Ensure that all of the dependencies used in the project are installed within the system before usage: React.JS, Express.JS, Nodemon, Supabase. If not, use these commands in the terminal:
```
npm install react react-dom
```
```
npm install express
```
```
npm install nodemon
```
```
npm install @supabase/supabase-js
```
5. Finally, the project can be run through this command:
```
npm start
```
6. When the server is running succesfully, the messsage "App is Running" will be displayed in the terminal.
7. This website application can also be accessed at http://localhost:3000 through your browser.
8. To terminate this process, simpy use CTRL + C 

### API Development
- We use the free version of the Rescue Groups API. For the majority of the website's functionality, we utilize the **/v5/public/orgs/search** endpoint which sends a POST request to return all information regarding pets that are up for adoption along with their shelters. This is the bread and butter of our website as this showcases our mission: to connect people with pets.
- We use the Leaflet API to create a Map Display that provide visual matching system for ease of use. With this API, we are able to display data that are pulled from the **/v5/public/orgs/search** endpoint of the Rescue Groups API such as names, phone numbers, and locations of shelters in the form of pins.
- To help future pet owners have an easier time to decide in what kind of pets they would like to adopt, we have provided a learn page with comprehesive information about many breeds of pets, such as dogs, cats, etc. This information is pulled from the Dogs API **v1/breeds** endpoint which includes all kinds of details about each breed. For ease of use, we have made the UI in the form of star ratings.
- To ensure that the website is all about pets, we have added a slider using a JS library to showcases cute pet images from **https://dog.ceo/api/breeds/image/random/5** and **https://api.thecatapi.com/v1/images/search?limit=5**.
- Lastly, we are connected to an external database that we created through Supabase. For this API, we use the POST endpoint to gather sensitive information that users fill out from the Contact page. For example, when users input their name, phone number, email, and message in the contact page, the data will be posted in our database ready for us to use.
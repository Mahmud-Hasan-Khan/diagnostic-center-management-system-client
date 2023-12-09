# MediCare
A simple full-stack Diagnostic Center Management System website where users can book appointment for test, online payment facility & get test result in online.
## Project features
### Home Page
-  Home page have a `Navbar`, `Banner`, This is a dynamic. Admin can upload data from the dashboard. The admin can select which banner to display on the home page. Based on the info display all properties in the banner. provable info will be [ title, image, text, coupon code, discount rate for coupon code, etc, just display the banner which status “isActive= true”]

- The `all tests` button on the banner to navigate all tests page

- `All featured tests` [featured tests are mostly booked tests by the users data loaded dynamically from server]

- Also have `Promotions` section that user can get promotions on test discount.

- `Personalized recommendation`: Recommendations include health tips suggested by healthcare professionals in a slider. 

### User Authentication and Profile Management

        User authentication using Firebase Authentication for secure email/password login
        users can register with their
        ■ email
        ■ name
        ■ avatar(use imageBB to upload the user avatar)
        ■ blood group(a selector with option A+, A-, B+, B-, AB+, AB-, O+, O-)
        ■ district(select option)
        ■ upazila(select option)
        ■ password
        ■ confirm_password

 - On the Registration page, display errors when:

        The password
        is less than 6 characters
        don't have a capital letter
        don't have a special character

- On the Login page, display errors when:

        - password doesn't match
        - email doesn't match

- After `Successful logged` in user show's a `toast`.
### All tests page
- Here all the available tests displayed along with info : image , available dates, slots , title, short description etc . [ Only display test data available for the future dates, so user can see only display data starting from date of today.]

- Each card will have a detailed button . After clicking on the button the user will be navigated to the details page .

## Live Site Link
- [Click Here to Open Live Site](https://medicare-mahmud.web.app/)

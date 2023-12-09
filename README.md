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

### Test Details Page
- users can see the details of the test.
- They can book it using the book now button [if available slot count is greater than
0].
- On booking available slots will be reduced by one.
- When a user book a service, by default the report status will be pending.
- While clicking the Book now button there will be a popup for payment . user can apply for a promocode and then the discount rate will be applied on the price . Then can make payment using stripe.

### ADMIN DASHBOARD
- All users route

        ○ Admin can see all the users in the all users route.
        ○ Admin can see details of a user in a modal after clicking see info button of a user.
        ○ Admin can change a user status . [active or blocked] . If blocked, this user can not access his dashboard and can not book a test/service.
        ○ An admin can change the role of a user and can make him admin.
- Add a test route

        ○ Here an Admin can add a new test . there will be input filed test name , image url, details, price, date, slots etc.
        ○ On successful insertion you need to show a confirm toast.
- All tests route

        ○ Here all the tests/services will be displayed in a table format.
        ○ Admin can delete a test/service data.
        ○ Admin can update a test/service Data.
        ○ Admin can see all reservations under a test given below .
- Reservation

        ● Here the admin can see all the reservations of users for the specific test .
        ● There will be a searching system to search reservations of a user by his/her email.
        ● He can cancel a reservation
        ● He can submit the test result for the reservation. [ On submitting the result the status of the report will be delivered . [ make your own decision on how to submit the test report, for example You can submit pdf link , doc link etc or implement some other feature . ]

- Add banner

        Here admin can upload data for a banner. [name , image , title , description, coupon code name, coupon rate, isActive= false ]
- All Banners

        ● Here all the banner info will be displayed in table format. Admin can delete a banner.
        ● Admin can select one and only one banner to display in the Home banner. So he will change isActive= true for a banner , Other banner’s isActive status will be false by default.


### User Dashboard
 - Upon successful login, users are redirected to the user dashboard.
 
 - Upcoming Appointments :

        ■ Users can view a list of upcoming appointments they have booked.
        ■ Each appointment displays key details, including the test name, date, and time.
        ■ Users have the option to cancel appointments.

 - Test Results:

        ■ Users access a section to view their test results [ basically all delivered reports] .
        ■ Users can download or print test results for their records.

 - My Profile

        Here User will see his profile details. He will be able to edit his profile data.

### Implemented JWT 
 - For API secure JWT Implemented.

### Pagination Implemented in ALL tests page 

## Live Site Link
- [Click Here to Open Live Site](https://medicare-mahmud.web.app/)

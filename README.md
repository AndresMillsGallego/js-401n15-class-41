# Celestial

React-Native application built by Andres Mills Gallego

[My Github](https://github.com/AndresMillsGallego)

## Usage

This app is very simple to use!  

When the page first loads you simply follow the instructions:

- Click the **"Pick A Date"** button!
- Select a date from the selector
- ....profit!!!

That is all there is to it.  You can select from any valid date and based on that date you will be bedazzled with NASA's "Astronamy Picture Of The Day", or **APOD** for short,  for that specific date along with a description.

## Details and Fun Facts

For each unique date selected, an API call is made to NASA's database which returns some data on the `APOD` for that day.

For this app we display the title, the image, the description and the date.
The copyright is also rendered when applicable (this element is rendered conditionally, if it exists)

On the initial page load, my github is linked if you would like to check it out!

After selecting a date, viewing the spectacular image and reading all the interesting facts, you can begin your search again by hitting the button at the bottom of the page.  

You will also see that NASA's webpage is linked there as well if you wanted to pay them a visit (hint...you should!)

### Fun Fact

Did you know that the `APOD` has been available since June 16 1995?  
Taking that into consideration, we coded our date picker to only offer dates between then and whichever date the current day is 😁!

## Tools and Resources Used

Tools, libraries and dependencies used for this application:

1. Our imagination!! 🌠🤩
2. Coffee ☕

## Dependcies

- `react`
- `react-native`
- `native-base`
- `axios`
- `expo`

## Resources

The open NASA API [here](https://api.nasa.gov/) was used to `GET` the data for the specific date selected.

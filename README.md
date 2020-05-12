# Emails input component

## Introduction

**PLEASE READ BEFORE EVALUATING CODE**

The component implements most of the requirements specified. The implementation is somewhere simplified for a realistic
production component. Some separation of concerns might seem like overkill for such a small component still it was used
to demonstrate approaches rather than taking overly pragmatic approach. In addition such approach is making parts of the
component reusable in different contexts and easier to evolve component further. Also in reality most of the frameworks
out there would provide ready made and more solid abstractions for separating those concerns.
 
One of the known missing features is input placeholder text, which slipped out of the view when checking designs and 
is not mentioned in the requirements. I noticed it only last moment and unfortunately just using *placeholder* attribute 
on the input is not enough to make this work given current auto-expanding input, and would require rework of layout 
strategy last minute so was omitted.

Another place where I allow my self deviation is approach to rendering and updates of markup. Though the requirements
mention not to re-render all emails on adding or removing email, I decided to still go with that approach with following
reasoning: any sort of diffing or direct markup update would inherently result in more complex, less predictable and 
readable code, so would have to have a good justification to proceed with. Looking a the current component requirements
and in general the fact that this is user interaction I would have to really see a valid case where performance of 
re-rendering would become a concern. In my experience re-rendering of usable amount of items is rarely and issue and 
for this type of component would mostly happen as a result of user interaction (which does not happen quicker than with
500ms interval in worst case). My assumption is that having more than 50 emails (or at max 100) would already be a usability
problem for any user to make such interaction useful, and re-rendering 50 items even every 500ms is not a performance
concern. Please correct me if those are wrong conclusions.

One more small optimisation that could be done is also not assigning remove button listeners on the item level (effectively
creating callback per every item), but handle it through propagation to the root element. To achieve that in a simple 
manner I would have to keep a reference to an object from DOM element. Unfortunately in TypeScript I would have to 
resort to tiny hack with casting to **any** to achieve that, so it was dilemma: adding hacks to the code or not doing
micro optimizations. The choice was towards the second, but can be quite easily changed.

I've chosen to implement the simplest form of observable pattern and only to suite my needs for implementing this
component. Normally there are many ready made solutions in every framework out there. My observable implementation
is done quickly out of my memory and has some simplified assumptions - for example it does not handle exceptions in
the subscribers and fails prematurely if one of the subscribers fails. There are definitely more edge cases but it's
good enough for illustration purposes.

Same is true for the view abstraction that I've made - it's an illustrative version that is good enough for such small
component and does not handle multiple aspects of solid view technology. There is no complete lifecycle of view objects
(like destroying, etc.).

Some interaction elements are probably not of the best usability, but there were no clear requirements on how those
should visualise (e.g. remove cross, form buttons) so I went with pragmatic approach there.

I deliberately didn't write code comments and inline documentation like JSDoc. Code is pretty much self explanatory
and hopefully simple enough to avoid unnecessary pollution. I tend to stick to the believe that code comments are code
smell and indicate that language constructs were not used properly to make code self documenting. There are only rare
cases where code comments justify themselves and I did not observe such here. As for JSDoc I think with TypeScript usage
it is barely useful as static typing helps making self documenting and self discoverable code. I decided to stick to 
some API description in this README.

I do not claim to have full test coverage, but I tried to illustrate different testing aspects. Tests were written 
quite in a hurry and have some hacks in them for cases like testing *paste* and *drop* events. I tried to demonstrate
how to approach testing in pretty puristic methodology, but I have experience ranging from no testing to full manual
testing, to metric driven testing on prod, to pure TDD, so can adjust to any setup.

I also do not think the current API design for the component (as suggested in requirements) is scalable. This is not how
you would normally approach designing components when building a framework or even when building complex UIs. It severely
lacks composability, it does not proliferate reusability through separation of concerns (it mixes them instead) and has
certainly other flaws. I took a risk of making small adjustments, like not triggering rendering using class constructor
(which is considered anti-pattern), but for the rest I kept it as requested. It is achieved though through a wrapping
class that composes more well defined concepts into a needed API (facade).

I use SCSS because it was more or less out of the box when setting up project, but in essence I don't really use any of
it's benefits and stick to pure CSS.

## EmailInput API

In essence the code and interfaces are pretty much self exploratory but here's some outline of the API.

 * **constructor** - As specified in requirements it receives the container to render into and set of options. There was
 no clear specification on what options are to be implemented so I've added two: **emails** and **onChange**. **emails**
 option can be used to set initial value, **onChange** can be used to provide a listener for emails list changes. There
 is not API methods to assign change listeners. Constructor **WILL NOT** render component, for that you need to call
 **create** method.
 
 * **create** - Performs actual rendering of the component. Added to not do any method invocation inside constructor,
 which is considered anti-pattern. Returns the component itself so can be conveniently used in method chaining form.
 
 * **getEmails** - Retrieves a list of emails that are the current value of the input as per requirements.
 
 * **setEmails** - Replaces current list of emails with the new list as per requirements.
 
 * **addEmail** - Adds an email to the list. Is needed to be able to implement the requirements for the demo form.
 
 * **scrollToBottom** - Scrolls to the bottom of the input when there is overflow. Added to make a demo form behave nicer.

## Installing dependencies

To install all NPM dependencies:

```
npm install
```

## Building the project

To run webpack build:

```
npm run build
```

## Running tests

To run tests:

```
npm test
```

## Linting the project

To run TSLint:

```
npm run lint
```

## Developing the project

To run webpack in watch mode:

```
npm run watch
```

## Samples

There's a **default** sample built based on the requirements provided - a form with input and two buttons. The sample
HTML is generated using html-webpack-plugin and is inside **dist** folder after performing the build or watch task under
the name of **default-sample.html**. The sources (TS, SCSS and EJS template files) are located in **/samples/default**.

Links:
 * [Default sample](dist/default-sample.html)

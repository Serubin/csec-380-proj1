# Questions and Write Ups

## Activity One
* What is the URL of your Github project?
  * https://github.com/Serubin/csec-380-proj1
* How did you breakup your projects and what are the security ramifications?
  * All the services are in a monolithic repo for ease of development. Due to this, if one project maintainers account gets compromised the security of the project could be at risk. This is especially true if CD is enabled.
* How did you choose to break down your milestones into various issues (tasks)?
  * We choose to break up our milestones by “Activities” defined by this document and then further broken down into tasks by each backend constrain and any other constraints mentioned in the “goal” descriptions.
* How do you ensure that after each issue/milestone that security has been verified? How would you identify such issues in an ideal environment?
  * Find known issues/vulnerables for the technologies employed from the CVE database, and attempt to exploit against our systems, next document and deploy mitigation until all known attacks fail.
  * Implement common vulnerability testing in Travis
  * Read the manual well, and follow best known practices.

## Activity Two

* What Web Application security mechanisms are involved in your topology? What security mechanisms would ideally be involved?
  * As much as possible, networks should be isolated. Additionally, the only external network should be the network which holds the load balancer and content loaders. This minimizes external facing services that could be directly touched and forces external users to pass through reverse proxies.
* What testing framework did you choose and why?
  * We decided to forego a single testing framework and use TavisCi as our major framework. Since every language tends to have it’s own specific test frameworks, it makes most sense to utilize them as necessary. Given this, we’ve set up the foundational requirements for all the various testing frameworks that our microservices will require. 


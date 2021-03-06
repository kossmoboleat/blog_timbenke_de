---
title: Working with Google App Engine
date: 2012-04-07
---
<a href="https://developers.google.com/appengine/">Google App Engine</a> (GAE) is a service that lets you run your web apps in The Cloud. It's a magical place where everything runs faster and better.

<figure>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Congestus_con.jpg/640px-Congestus_con.jpg" alt="Cumulus cloud from Wikipedia" />
<figcaption>Cumulus cloud from <a href="https://en.wikipedia.org/wiki/File:Congestus_con.jpg">Wikipedia</a></figcaption>
</figure>
In reality the cloud is not really one technique but rather a slightly overused term for running applications on remote computer in a data center facilitated by some framework that allows easy setup and abstracts away all the small hindrances of dealing with the underlying infrastructure. Google App Engine is a service that lets you put web apps on the web with the touch of a button. The apps run in a sandbox and as long as you don't overuse the resources you can even put your web app online for free. They estimate that the free limits of the service are enough for 5 millions views per month, which should be true for websites that do not primarily offer large files like videos or music.

The real beauty of all this nice abstraction comes in when you use GAE together with one of the supported frameworks. I've tested it with Django and my simple webapp from the earlier <a href="/2012/04/06/dabbling-in-web-development-with-django.html">post</a>. Django uses a small python script to manage a project and to test a web app locally all you have to do is run "python manage.py runserver", which starts a web server on your computer that you can access with 127.0.0.1:8000. When you change any of your project's files Django recognizes the changes and immediately reacts to it. This way you can develop very fast! This is one of the aspects I really love about web development; it's all so fast and you get to the see the results directly. I wish I had this kind of responsiveness when developing desktop apps. Pushing your changes into The Cloud is as easy as "python manage.py deploy". How awesome is that?

Ok, after all this good stuff here are the downsides. The <a href="https://developers.google.com/appengine/articles/django">documentation</a> for getting Django running is extremely outdated.   You only get a link to some other project that supposedly works much better. This project is called <a href="https://www.allbuttonspressed.com/projects/django-nonrel">django-nonrel</a>, which stands for non-relational meaning a No-SQL database. My first reaction was that it seemed totally unrelated to what I wanted to do. I didn't care what kind of database was used, but I was much more familiar with some relational DB and I had used SQLite before trying to convert my project for Google App Engine. Then I tried to follow their tutorials, but I soon encountered an annoying problem with GAE. When you upload your app and you make a mistake in the most basic setup; django, google app engine, python version mismatches, nothing works. The only information you get is a useless internal server error 500 error page. There's no documentation on how to deal with this and it took me an hour to find someone mentioning the google app engine administration to obtain logs. Even then it's all quite cryptic.

Apparently the default python version is the ancient 2.5, django's default is 0.96 and then you need "some" version from django-nonrel. After lots of searching I found out that Python 2.7, Django 1.3 and the latest django-nonrel is a working option. The way to go is to install Python 2.7, Django 1.3 and get django-nonrel from the project website. You have to obtain 6 packages (the last characters are the git hash, which reference the exact revision): 
<ul>
	<li>twanschik-django-autoload-1698ab544030</li>
	<li>wkornewald-django-dbindexer-ae5f7638827e</li>
	<li>wkornewald-django-nonrel-be48c152abc6</li>
	<li>wkornewald-django-testapp-3dd32705c980</li>
	<li>wkornewald-djangoappengine-60c2b3339a9f</li>
	<li>wkornewald-djangotoolbox-a8cdf61ba9c0</li>
</ul>
Then get the test app to work. Fortunately I found this stackoverflow thread that addressed the very problem. Get the packages from <a href="https://www.allbuttonspressed.com/projects/djangoappengine">this website</a>. Then follow the the instructions for the test app. This <a href="https://www.youtube.com/watch?v=_NHX8HsCuJ4">youtube tutorial</a> lists the necessary steps in more detail. Then start modifying the test app to include your own project. The youtube video goes through these steps very quickly too. The main idea is to make a subfolder for your project that is used from the modified test app. Fortunately the test app is already configures for django 1.3 and python 2.7 and the only thing you have to do is modify the app.yaml of the test app with your own application name. When you're done you've joined the ranks of the hip cloud people :-)!

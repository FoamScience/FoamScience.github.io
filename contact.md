---
title: Contact
layout: page
permalink: /contact/
---


<style>
.contact-li {
    list-style: none;
}

.contact-input {
    border:none;
    border-bottom: 1px solid #eee;
    width: 20em;
}

.contact-input:focus {
    outline:none;
    border-bottom: 1px solid #11114e;
}

.contact-label {
    display: block;
}

ul.contact-ul {
    margin: 0;
    padding: 10px;
}

#submit {
    border:none;
    background-color: #11114e;
    padding: 5px 15px;
    color: #eee;
    opacity: 0.8;
}

#submit:hover {
    opacity: 1;
    cursor: pointer;
}


#contact-form {
    border: 1px solid #aaa;
    display: inline-flex;
    margin-bottom: 1em;
}

</style>

You can send us your feedback and suggestions using this form. **Github** is a faster way to contact us,
but if you don't feel like opening an account there; you are encouraged to use this page.
<form id="contact-form" class="form" action="https://getsimpleform.com/messages?form_api_token={{site.api-token}}" method="POST" enctype="multipart/form-data">
        <ul class="contact-ul">
            <li class="contact-li">
                <label class="contact-label" for="name">Name:</label>
                <input type="text" placeholder="Your name" id="name" class="contact-input" name="name" tabindex="1"/>
            </li>
            <li class="contact-li">
                <label class="contact-label" for="email">Email:</label>
                <input type="email" placeholder="Your email" id="email" class="contact-input" name="email" tabindex="2"/>
            </li>
            <li class="contact-li">
                <label class="contact-label" for="message">Message:</label>
                <textarea class="contact-textarea" placeholder="Your message" class="contact-input" rows="4" id="message" name="message" tabindex="3"></textarea>
            </li>
            
        </ul>
        <input type="submit" value="Send" id="submit"/>
        <input type="hidden" name='redirect_to' value="{{ "/thank-you" | prepend: site.url }}" />
        
</form>


# Recipesme - the API


### A fairly straight forward API with CRUD functionality for a MongoDB
<br>
Why?

 - An excuse to write a modern node stack with all async calls
 - To serve as an API for a Junior Dev friend of mine to build frontends from as part of his development
 - Also a little playground for me refine some AWS security and performance concepts
 - Shits and giggles



<br>
Tech

- Express
- MongoDB (using Mongoose)
- Multer / Sharp
- AWS (S3, SignedURLs, Cloudfront CDN(...coming soon))

<br>

---




## Some documentation
<br>



> GET 
<br>

`/recipes` 
- Returns all recipes in an array

<br>

`/recipes/:id`
- Returns one matching recipe is an object

Example response (Get all)

```	
        200 OK
[
    {
		"_id": "63f640d0912b751aa9588399",
		"title": "Carrot & Parsnip Soup",
		"image": "f769568f-2061-41f0-b040-c67b08c29893",
		"description": "Healthy, and with tumeric and ginger benefits",
		"steps": [
            "Mix it all together",
            "Boil, blend, eat"
        ],
		"tags": [
            "Healthy",
            "Easy"
        ],
		"ingredients": [
 			{
				"item": "Carrots",
				"amount": 500,
                "unit" : "g"
				"_id": "63f64194e7d868956e56a8cc"
			},
			{
				"item": "Parsnips",
			    "amount": 500,
                "unit" : "g"

				"_id": "63f64194e7d868956e56a8cd"
			},
			{
				"item": "Other stuff",
				"amount": 500,
                "unit" : "g"
				"_id": "63f64194e7d868956e56a8ce"
			},
        ],
		"imageUrl": "https://signedURLhere.com"
    },
    {
        // another recipe
    },
    {
        // another recipe
    } //
]
```
---
<br>
<br>

> POST

`/recipes` 
- requires JSON body matching strucutre of GET response (minus _ids)

Example response
```
201 OK
Successfully added <recipe name> to DB.
```

---
<br>
<br>

> PUT

`/recipes/:id` 
- requires JSON body matching strucutre of GET response (minus _ids)
- Only fields wanting updating are necessary
eg Example Request body
```
{
    "title" : "New title here",
    "description" : "Updated description"
}
```

Example response
```
201 OK
<recipe name> successfully updated.
```


---
<br>
<br>

> DELETE

`/recipes/:id` 
- Will delete on recipe by id

Example response


```
200 OK
<recipe name> successfully deleted
```






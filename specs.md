### Task: Develop a simple yet robust API that manages a collection of blog posts and associated comments using MongoDB as the database. The API should include endpoints for CRUD operations (Create, Read, Update, Delete) and support pagination.

### Requirements:


#### Auth routes : 

1.[-] router.post('/login', expressRouteAdapter(makeSignInController()));
2.[-] router.post('/register', expressRouteAdapter(makeSignUpController()));

#### Post routes : 

1.[+] router.get('/posts', expressRouteAdapter(postsController())); 
2.[+] router.get('/posts/:id', expressRouteAdapter(makeGetPostByIdController()));
3.[+] router.post('/posts', authMiddleware, expressRouteAdapter(makeCreatePostController()));
4.[+] router.delete('/posts/:id', authMiddleware, expressRouteAdapter(makeDeletePostController()));
5.[+] router.patch('/posts/:id', authMiddleware, expressRouteAdapter(makeUpdatePostController()));

#### Comments routes : 

1.[+] router.get('/comments/:id', expressRouteAdapter(makeGetLatestCommentsByPostIdController()));
2.[+]  route.get('/comments', expressRouteAdapter(makeCreateCommentController()));
3.[+]  router.post('/comments', authMiddleware, expressRouteAdapter(makeCreateCommentController()));
4.[+] router.patch('/comments/:id', authMiddleware, expressRouteAdapter(makeUpdateCommentController()));
5. [+]  router.delete('/comments/:id', authMiddleware, expressRouteAdapter(makeDeleteCommentController()));
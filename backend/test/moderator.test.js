const request = require('supertest');
const server = require('../index');
const mongoose = require('mongoose');

describe('Moderator API', () => {
  beforeAll(async () => {
    await Article.deleteMany({}); // Clear the articles
  });

  afterAll(async () => {
    await Article.deleteMany({}); // Clear the articles
    await mongoose.connection.close();
    server.close();
  });
  
  // Testing for moderator/test route 
  it('should return moderator route testing! for GET /api/moderator/test', async () => {
    const res = await request(server).get('/api/moderator/test');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('moderator route testing!');
  });

  // Testing whether the user with no moderator role getting access denied from the page
  // it('should return 403 if not a moderator for GET /api/moderator', async () => {
  //   const res = await request(server).get('/api/moderator');
  //   expect(res.statusCode).toEqual(403);
  //   expect(res.text).toEqual('Access Denied: You are not a Moderator!');
  // });

  // Testing whether the page shows only one article when it has been added one article in the queue
  it('should list ALL articles in the moderation queue on /api/moderator GET', async () => {
    // Create one article for testing
    await Article.create({ 
      title: 'Test Article', 
      authors: 'michael', 
      journalName: 'Test', 
      pubYear:'1', 
      volume:'1', 
      pages:'1', 
      doi:'Test', 
      claims: 'Test', 
      method:'Test', 
      inModerationQueue: true });

    const res = await request(server).get('/api/moderator');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toEqual('Test Article');
  });

  // Testing whether the page shows empty list after the deletion of all articles
  it('should return appropriate error message if no articles in the moderation queue', async () => {
    // Delete all the articles to make Moderation Queue empty
    await Article.deleteMany({});
    
    const res = await request(server).get('/api/moderator');

    // console.log(res.body);

    expect(res.status).toEqual(404);
    expect(res.body.noarticlesfound).toEqual('No Articles found in the moderation queue');
  });

  // Test for DELETE /api/moderator/:id route
it('should delete article in the moderation queue on DELETE /api/moderator/:id', async () => {
  // Create an article for testing
  const article = await Article.create({ 
    title: 'Test Article for Delete', 
    authors: 'michael', 
    journalName: 'Test', 
    pubYear:'1', 
    volume:'1', 
    pages:'1', 
    doi:'Test', 
    claims: 'Test', 
    method:'Test', 
    inModerationQueue: true 
  });
  
  const res = await request(server).delete(`/api/moderator/${article.id}`);
  // console.log(res.body);

  expect(res.status).toEqual(200);
  expect(res.body.msg).toEqual('Article entry deleted successfully');
  
  // Check if the article is actually deleted from the database
  const foundArticle = await Article.findById(article.id);
  expect(foundArticle).toBeNull();
});

// Test for trying to delete non-existing article
it('should return 404 error when trying to delete non-existing article', async () => {
  const nonExistingId = 'someNonExistingId';
  const res = await request(server).delete(`/api/moderator/${nonExistingId}`);
  
  expect(res.status).toEqual(404);
  expect(res.body.error).toEqual('No such an article');
});

  // it('should list ALL articles in the moderation queue on /api/moderator GET', async () => {
  //   // Create one article for testing
  //   await Article.create({ title: 'Test Article', authors: 'michael', journalName: 'Test', pubYear:'1', volume:'1', pages:'1', doi:'Test', claims: 'Test', method:'Test', inModerationQueue: true });
  //   // Moderator 세션을 설정해야 합니다.
    
  //   const res = await request(server)
  //   .post('/api/login') // 로그인 API 경로를 사용해주세요.
  //   .send({
  //     username: 'moderatorUsername',
  //     password: 'moderatorPassword',
  //   });

  //   // 세션 쿠키를 저장합니다.
  //   const moderatorSessionCookie = res.headers['set-cookie'];


  //   const res = await request(server)
  //     .get('/api/moderator')
  //     .set('Cookie', `session=${moderatorSessionCookie}`); // 여기에 올바른 세션 쿠키를 설정하세요.

  //   expect(res.status).toEqual(200);
  //   expect(res.body).toHaveLength(1);
  //   expect(res.body[0].title).toEqual('Test Article');
  // });

  // it('should return appropriate error message if no articles in the moderation queue', async () => {
  //   // Delete all the articles to make Moderation Queue empty
  //   await Article.deleteMany({});

  //   const moderatorSessionCookie = 'YOUR_MODERATOR_SESSION_COOKIE';
    
  //   const res = await request(server)
  //     .get('/api/moderator')
  //     .set('Cookie', `session=${moderatorSessionCookie}`); // 여기에 올바른 세션 쿠키를 설정하세요.
      
  //   expect(res.status).toEqual(404);
  //   expect(res.body.noarticlesfound).toEqual('No Articles found in the moderation queue');
  // });
});
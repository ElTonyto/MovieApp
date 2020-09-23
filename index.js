const express = require('express');
const axios = require('axios');
const app = express();

const url = 'https://jsonplaceholder.typicode.com/users';

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/users', async (req, res) => {
    try {
        const resp = await axios.get(url);
        res.send(JSON.stringify(resp.data));
        console.log('get');
    } catch (error) {
        res.send(error);
        console.log('get failed');
    }

});

app.get('/users/:id', async (req, res) => {
    try {
        const resp = await axios.get(`${url}/${req.params.id}`);
        res.send(JSON.stringify(resp.data));
        console.log('get:' + `${req.params.id}`);
    } catch (error) {
        res.send(error);
        console.log('get:' + `${req.params.id}` + ' failed');
    }
});

app.post('/users', async (req, res) => {
    try {
        const resp = await axios.post(url, req.body);
        res.send(JSON.stringify(resp.data));
        console.log('post');
    } catch (error) {
        res.send(error);
        console.log('post failed');
    }

});

app.put('/users/:id', async (req, res) => {
    try {
        const resp = await axios.put(`${url}/${req.params.id}`, req.body);
    res.send(JSON.stringify(resp.data));
    console.log('put');
    } catch (error) {
        res.send(error);
        console.log('put failed');
    }
    
});

app.delete('users/:id', async (req, res) => {
    try {
        const resp = await axios.delete(`${url}/${req.params.id}`);
        if (res.status === 200) {
            res.send("L'utilisateur a bien été supprimé");
        }
    }
    catch (error) {
        res.send(error);
    }
});

app.get('/users/:id/posts', async (req, res) => {
    const resp = await axios.get(`${url}/${req.params.id}/posts`);
});

app.get('/users/:id/albums', async (req, res) => {
    //récupération des albums et photos en parrallèles en promesses
    const albumsAxios = axios.get(`${url}/${req.params.id}/albums`);
    const photosAxios = axios.get(`${url}/${req.params.id}/photos`);

    // récupération des données des promesses (l'un après l'autre)
    const [albums, photos] = [(await albumsAxios).data, (await photosAxios).data];
    // pour chaque album j'insère les photos qui ont le même id d'album
    albums.forEach((album) => {
        album.photos = photos.filter(photo => photo.albumId == album.id);
    });

    res.send(albums);
});

app.listen(3030);

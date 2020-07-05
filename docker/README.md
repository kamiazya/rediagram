# rediagram ![WIP](https://img.shields.io/badge/-WIP-yellow)

rediagram runtime for Docker.

```bash
$ make build
docker build -t rediagram:0.0.0 .
...
Successfully built d5b17335837b
Successfully tagged rediagram:0.0.0
$ tree
.
└── MyInfra.rediagram.tsx

0 directories, 1 file
$ docker run --rm -v `pwd`:/workdir/ rediagram
$ tree
.
├── MyInfra.rediagram.png
└── MyInfra.rediagram.tsx

0 directories, 2 files
```

## License

This software is released under the MIT License, see LICENSE.

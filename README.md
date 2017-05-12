# node-radio-station
At the moment, this is still a draft. The biggest part of this application is dummy code and it won't run if you checkout.


## Know Issues
### Speaker
ON Mac OS X theres an Issue with the speaker module (https://github.com/TooTallNate/node-speaker/issues/95).
After the stream ends, the application crashes with the following error: `Illegal instruction: 4 `

To fix this problem, install the speaker module with the following args (http://stackoverflow.com/questions/43582634/nodejs-throws-illegal-instruction-4-on-mac-os):
```sh
npm install speaker --mpg123-backend=openal
```

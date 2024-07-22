# Trains In Signal Blocks

The intention of this code is to display the currently passing train on a sign in the Biscuits office.

At present, we use train information provided by [Network Rail](https://datafeeds.networkrail.co.uk/ntrod/welcome).

This code is a Javascript implementation of their Python Example, found [here](https://github.com/openraildata/td-trust-example-python3).

# What it does

At present, it allows you to select an area and choose signal blocks to watch trains arriving and leaving that signal block.

Most information to set this script up can be found on the [Open Rail Data Wiki](https://wiki.openraildata.com/index.php?title=Main_Page), I appreciate it's difficult to navigate but I'll do my best to explain.

# Setting your Signal Blocks

Included is a sample .env file, `sample.env`, rename this `.env` and set up your environment variables in there.

At present, we are watching Births 68,69,70,76,77,78,79,80 and 81, in area_id Y4 as described in our `.env`.

Y4 is Sheffield, but you can find other Train Describers (area ids) [here](https://wiki.openraildata.com/index.php?title=List_of_Train_Describers).

# Running callback scripts

In order to deal with your data, create a Javascript file in the `plugins` directory that exports a function. Whenever a change occurs in a watched signal block, the script will run this function.

As an example, copy the file named `visual.js` from the examples folder into the `plugins` directory. This script will output a small visual of the tracks outside Sheaf Bank Business Park to the Console.

Put all of your scripts in there you wish to run.

## Example callback

```js
function do_callback(data) {
  console.log(data);
  // data looks like
  // {
  // '68': '',    
  // '69': '',    
  // '70': '',    
  // '76': '',    
  // '77': '1R78',
  // '78': '',    
  // '79': '',    
  // '80': '',    
  // '81': ''     
  // }
}

module.exports = do_callback
```


module Task.MongoDB
  (
  ) where

import Native.MongoDB

type DB = DB

type alias Options =
    { url  : String
    , port : Int
    , name : String
    }

connect : Options -> Task String DB
connect = Native.MongoDB.connect

close : DB -> Task String ()
close = Native.MongoDB.close


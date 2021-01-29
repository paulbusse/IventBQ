# API Definition

## Generic

### `GET /OK`

This call can be used to validate that the API is responding

#### Parameters

None

#### Request body

N/A

#### Response body

* `status`: always has the value `ok`

##### Example

```json
{
    "status": "ok"
}
```

* `200`: success

## Label Files

### `GET /label/files/:id`

Downloads the generated PDF file after a successful generation.

#### Parameters

* `ìd`: An id returned by [`POST /label/files`](#post-labelfiles)

#### Request body

N/A

#### Response body

The downloaded PDF file.

#### Return codes

* `200`: success
* `400`: The following error codes can be returned
  * `CLF_4`: The passed `ìd` is not valid.

### `POST /label/files`

Create a set of labels that can be printed. This only does the generation of the file. The download is done by a different API

#### Parameters

None

#### Request body

* `type`: the name of a label type.
  * type: string
  * see [`GET /label/types`](#get-labeltypes)

* `npages`: (optional, defaults to 1)
  * type: number;
  * there is a maximum number of pages that can be requested
  * if the value cannot be interpreted correctly the default value is used

##### Example

```json
{
    "type": "APLI A4 3x8",
    "npages": 1
}
```

#### Response body

* `id`: a key for the job
* `npages`: the number of pages used
* `type`: the name of a label type used
* `message`: additional information about the execution of the job

##### Example

```json
{
    "id": "kkdnidqh",
    "npages": 1,
    "type": "APLI A4 3x8",
    "message": "Het PDF-bestand wordt gegeneerd. "
}
```

#### Return codes

* `200`: success
* `400`: The following error codes can be returned
  * `CLF_1`: the label type was missing.
  * `CLF_2`: the label type was not recognized.
  * `CLF_3`: the label generation of the label file failed.

## Label Types

### `GET /label/types`

Get a list of the names of all label types.

#### Parameters

None

#### Request body

N/A

#### Response body

An array of strings. Each element in the string represents the name of a label type

#### Return codes

* `200`: success
* `500`: unexpected internal error

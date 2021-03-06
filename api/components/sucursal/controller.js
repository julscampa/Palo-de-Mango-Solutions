const cloudinary = require('cloudinary'),
  Sucursal = require('./model');

exports.registrarSucursal = async (req, res) => {
  
  // Se guarda la imagen en cloudinary y la dirección de la imagen en la base de datos
  const result = await cloudinary.v2.uploader.upload(req.file.path);

  //Se crea una nueva sucursal
  const newSucursal = new Sucursal({
    name: `Sucursal de ${req.body.canton}`,
    horario: req.body.horario,
    phone: req.body.phone,
    provincia: req.body.provincia,
    canton: req.body.canton,
    distrito: req.body.distrito,
    direction: req.body.direction,
    googleMaps: req.body.googleMaps,
    imgUrl: result.url,
    cloudinary_id: result.public_id,
    idLibreria: req.session.idLibreria

  });

    const savedSucursal = await newSucursal.save();
    console.log('Esta es la sucursal', savedSucursal);

    res.redirect(`/sucursal/admin/${savedSucursal._id}`);

}

exports.HTMLView = (req, res) => {
  try {
    res.sendFile('sucursal.html', {
      root: 'public'
    });
  } catch (err) {
    res.json({
      message: err
    })
  }
}



exports.listarSucursales = async (req, res) => {
 
  try {
    const sucursales = await Sucursal.find();
    res.json(sucursales);

  } catch(err){
    res.json({
      message: err
    })
  }
}
exports.listarSucursal = async (req, res) => {
  try {
    const sucursal = await Sucursal.findById({
      _id: req.params.idSucursal
    });

    console.log(sucursal);
    res.json(sucursal);
  } catch(err){
    res.json({
      message: err
    })
  }
}

exports.listarSucursalesLibreria = async (req, res) => {
  try {
    const sucursales = await Sucursal.find({
      idLibreria: req.params.idLibreria
    });
    console.log(sucursales);
    res.json(sucursales);
  } catch(err){
    res.json({
      message: err
    })
  }
}

// exports.listarSucursales = async (req, res) => {
//   try {
//     const sucursales = await Sucursal.find({libreriaId: req.session.libreriaId});
//     res.json(sucursales);

//   } catch (err) {
//     res.json({
//       message: err
//     })
//   }
// }

// exports.HTMLViewAdmin = (req, res) => {
//   try {
//     res.sendFile('página-sucursal-adminLibreria.html', {
//       root: 'public'
//     });
//   } catch (err) {
//     res.json({
//       message: err
//     })
//   }

// }
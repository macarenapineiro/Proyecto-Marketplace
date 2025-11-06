import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { Snackbar } from 'react-native-paper';
import { useSolicitud } from '../context/SolicitudContext';
import DropdownComponent from './dropDown';

export default function FormSolicitud() {
  // const [showSuccess, setShowSuccess] = useState(false);
  const { agregarSolicitud } = useSolicitud() as {
    solicitudes: any[];
    agregarSolicitud: (solicitud: any) => void;
  };
  const categorias = [
    { label: 'Reparaciones', value: 'reparaciones' },
    { label: 'Limpieza', value: 'limpieza' },
    { label: 'Jardinería', value: 'jardineria' },
    { label: 'Electricidad', value: 'electricidad' },
    { label: 'Plomería', value: 'plomeria' },
    { label: 'Pintura', value: 'pintura' },
    { label: 'Carpintería', value: 'carpinteria' },
    { label: 'Construcción', value: 'construccion' },
    { label: 'Mecánica', value: 'mecanica' },
  ]
  const ubicaciones = [
    { label: 'Maldonado', value: 'maldonado' },
    { label: 'Punta del Este', value: 'punta_del_este' },
    { label: 'San Carlos', value: 'san_carlos' },
    { label: 'Pan de Azúcar', value: 'pan_de_azucar' },
    { label: 'Piriápolis', value: 'piriapolis' },
    { label: 'La Barra', value: 'la_barra' },
    { label: 'José Ignacio', value: 'jose_ignacio' },
    { label: 'Otro', value: 'otro' },
  ]
  const unidades = [
    { label: 'kg', value: 'kg' },
    { label: 'litros', value: 'litros' },
    { label: 'metros', value: 'metros' },
    { label: 'm²', value: 'metrosCuadrados' },
    { label: 'unidades', value: 'unidades' },
  ]

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    ubicacion: '',
    fechaLimite: '',
    materiales: [],
  })
  const [materiales, setMateriales] = useState<{ nombre: string; cantidad: string; unidad: string }[]>([]);
  const [nuevoMaterial, setNuevoMaterial] = useState({ nombre: '', cantidad: '', unidad: '' });
  const handleMaterialChange = (field: string, value: string) => {
    setNuevoMaterial(prev => ({ ...prev, [field]: value }));
  };

  const agregarMaterial = () => {
    if (!nuevoMaterial.nombre || !nuevoMaterial.unidad || !nuevoMaterial.cantidad) return;
    setMateriales(prev => [...prev, nuevoMaterial]);
    setNuevoMaterial({ nombre: '', unidad: '', cantidad: '' });
  };

  const eliminarMaterial = (index: number) => {
    setMateriales(prev => prev.filter((_, i) => i !== index));
  };
  const [showDate, setShowDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setShowDate(false);
    setFormData(prev => ({ ...prev, fechaLimite: date.toISOString().split('T')[0] }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    // reset
    setFormData({ titulo: '', descripcion: '', fechaLimite: '', categoria: '', ubicacion: '', materiales: [] });
    setNuevoMaterial({ nombre: '', cantidad: '', unidad: '' });
    setMateriales([]);
    setSelectedDate(null);
  }

  const handleSubmit = () => {
    if (!formData.titulo || !formData.descripcion || !formData.categoria || !formData.ubicacion || !formData.fechaLimite) {
      alert('Completa todos los campos');
      return;
    }
    const nuevaSolicitud = {
      ...formData,
      categoria: formData.categoria,
      ubicacion: formData.ubicacion,
      fechaLimite: formData.fechaLimite,
      materiales: materiales.map(m => ({
        nombre: m.nombre,
        cantidad: parseFloat(m.cantidad),
        unidad: m.unidad
      })),
      estado: 'Abierto',
    };
    agregarSolicitud(nuevaSolicitud);

    // reset
    setFormData({ titulo: '', descripcion: '', fechaLimite: '', categoria: '', ubicacion: '', materiales: [] });
    setNuevoMaterial({ nombre: '', cantidad: '', unidad: '' });
    setMateriales([]);
    setSelectedDate(null);
    Alert.alert(
      '¡Éxito!',
      'La solicitud se creó correctamente.',
      [{ text: 'Aceptar', onPress: () => console.log('Usuario aceptó') }],
      { cancelable: false }
    );
    // setShowSuccess(true);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Crear nueva solicitud</Text>

        <Text style={styles.label}>Título del servicio</Text>
        <TextInput
          style={styles.input}
          value={formData.titulo}
          onChangeText={text => handleInputChange('titulo', text)}
          placeholder="Ej. Reparación del techo"
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          value={formData.descripcion}
          onChangeText={text => handleInputChange('descripcion', text)}
          placeholder="Describe el servicio"
          multiline
        />
        <Text style={styles.label}>Categoría</Text>
        <DropdownComponent label="Categoría" data={categorias} value={formData.categoria} onValueChange={value => handleInputChange('categoria', value)} />
        <Text style={styles.label}>Ubicación</Text>
        <DropdownComponent label="Ubicación" data={ubicaciones} value={formData.ubicacion} onValueChange={value => handleInputChange('ubicacion', value)} />
        <Text style={styles.label}>Fecha requerida</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDate(true)}>
          <Text>{selectedDate ? selectedDate.toDateString() : 'Seleccionar fecha'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showDate}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setShowDate(false)}
        />
        <Text style={styles.subtitle}>Materiales necesarios: </Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del material"
          value={nuevoMaterial.nombre}
          onChangeText={text => handleMaterialChange('nombre', text)}
        />
        <Text style={styles.label}>Unidad</Text>
        <DropdownComponent label="Unidad" data={unidades} value={nuevoMaterial.unidad} onValueChange={value => handleMaterialChange('unidad', value)} />
        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          value={nuevoMaterial.cantidad}
          onChangeText={text => handleMaterialChange('cantidad', text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.agregarButton} onPress={agregarMaterial}>
          <Text>Agregar Material +</Text>
        </TouchableOpacity>

        {materiales.map((m, i) => (
          <View key={i} style={styles.materialCard}>
            <Text>{m.nombre} ({m.cantidad} {m.unidad})</Text>
            <TouchableOpacity onPress={() => eliminarMaterial(i)}>
              <Text style={{ color: 'red' }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity style={styles.solicitudButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Crear solicitud</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => { handleCancel() }}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50'
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#34495e'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d8e0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    color: '#2c3e50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d8e0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#2c3e50'
  },
  agregarButton: {
    padding: 12,
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  solicitudButton: {
    backgroundColor: '#4db6ac',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#eceff1',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#2c3e50',
    fontWeight: '600',
  },
  materialCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
})
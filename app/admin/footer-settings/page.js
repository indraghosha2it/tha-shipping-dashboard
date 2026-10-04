// 'use client';

// import { useState, useEffect } from 'react';
// import { getAuthToken } from '@/utils/SessionHelper';

// const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// export default function FooterSettingsPage() {
//   const [settings, setSettings] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState({});

//   const headers = () => ({ Authorization: `Bearer ${getAuthToken()}` });

//   useEffect(() => {
//     fetch(`${API}/footer-settings`)
//       .then((r) => r.json())
//       .then((res) => setSettings(res.data));
//   }, []);

//   const uploadLogo = async (type, file) => {
//     setUploading((s) => ({ ...s, [type]: true }));
//     const fd = new FormData();
//     fd.append('logo', file);
//     try {
//       const res = await fetch(`${API}/footer-settings/upload/${type}-logo`, {
//         method: 'POST',
//         headers: headers(),
//         body: fd,
//       });
//       const data = await res.json();
//       if (data.success) {
//         setSettings((p) => ({ ...p, [`${type}Logo`]: data.data }));
//       } else alert(data.message);
//     } finally {
//       setUploading((s) => ({ ...s, [type]: false }));
//     }
//   };

//   const uploadGallery = async (files) => {
//     setUploading((s) => ({ ...s, gallery: true }));
//     const fd = new FormData();
//     Array.from(files).forEach((f) => fd.append('images', f));
//     try {
//       const res = await fetch(`${API}/footer-settings/upload/gallery`, {
//         method: 'POST',
//         headers: headers(),
//         body: fd,
//       });
//       const data = await res.json();
//       if (data.success) setSettings((p) => ({ ...p, galleryImages: data.data }));
//       else alert(data.message);
//     } finally {
//       setUploading((s) => ({ ...s, gallery: false }));
//     }
//   };

//   const deleteGalleryImage = async (id) => {
//     if (!confirm('Delete this image?')) return;
//     const res = await fetch(`${API}/footer-settings/gallery/${id}`, {
//       method: 'DELETE',
//       headers: headers(),
//     });
//     const data = await res.json();
//     if (data.success) setSettings((p) => ({ ...p, galleryImages: data.data }));
//   };

//   const saveSettings = async () => {
//     setSaving(true);
//     try {
//       const res = await fetch(`${API}/footer-settings`, {
//         method: 'PUT',
//         headers: { ...headers(), 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contactInfo: settings.contactInfo,
//           socialLinks: settings.socialLinks,
//           companyName: settings.companyName,
//           description: settings.description,
//           copyrightText: settings.copyrightText,
//           discoverLinks: settings.discoverLinks,
//           informationLinks: settings.informationLinks,
//         }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         alert('Saved!');
//         setSettings(data.data);
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!settings) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-8">
//       <h1 className="text-2xl font-bold">Footer Settings</h1>

//       {/* Navbar Logo */}
//       <section className="border p-4 rounded-lg">
//         <h2 className="font-semibold mb-2">Navbar Logo</h2>
//         {settings.navbarLogo?.url && (
//           <img src={settings.navbarLogo.url} alt="navbar" className="h-16 mb-2" />
//         )}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => e.target.files[0] && uploadLogo('navbar', e.target.files[0])}
//         />
//         {uploading.navbar && <p className="text-xs">Uploading...</p>}
//       </section>

//       {/* Banner Logo */}
//       <section className="border p-4 rounded-lg">
//         <h2 className="font-semibold mb-2">Banner Logo</h2>
//         {settings.bannerLogo?.url && (
//           <img src={settings.bannerLogo.url} alt="banner" className="h-16 mb-2" />
//         )}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => e.target.files[0] && uploadLogo('banner', e.target.files[0])}
//         />
//         {uploading.banner && <p className="text-xs">Uploading...</p>}
//       </section>

//       {/* Gallery */}
//       <section className="border p-4 rounded-lg">
//         <h2 className="font-semibold mb-2">
//           Gallery ({settings.galleryImages?.length || 0}/6)
//         </h2>
//         <div className="grid grid-cols-3 gap-3 mb-3">
//           {settings.galleryImages?.map((img) => (
//             <div key={img._id} className="relative group">
//               <img src={img.url} className="w-full h-24 object-cover rounded" />
//               <button
//                 onClick={() => deleteGalleryImage(img._id)}
//                 className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//         {(settings.galleryImages?.length || 0) < 6 && (
//           <>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={(e) => e.target.files.length && uploadGallery(e.target.files)}
//             />
//             {uploading.gallery && <p className="text-xs">Uploading...</p>}
//           </>
//         )}
//       </section>

//       {/* Contact */}
//       <section className="border p-4 rounded-lg space-y-3">
//         <h2 className="font-semibold">Contact Info</h2>
//         <input
//           className="border p-2 w-full"
//           placeholder="Address line 1"
//           value={settings.contactInfo?.address?.line1 || ''}
//           onChange={(e) =>
//             setSettings((p) => ({
//               ...p,
//               contactInfo: {
//                 ...p.contactInfo,
//                 address: { ...p.contactInfo.address, line1: e.target.value },
//               },
//             }))
//           }
//         />
//         <input
//           className="border p-2 w-full"
//           placeholder="Address line 2"
//           value={settings.contactInfo?.address?.line2 || ''}
//           onChange={(e) =>
//             setSettings((p) => ({
//               ...p,
//               contactInfo: {
//                 ...p.contactInfo,
//                 address: { ...p.contactInfo.address, line2: e.target.value },
//               },
//             }))
//           }
//         />
//         <input
//           className="border p-2 w-full"
//           placeholder="Email"
//           value={settings.contactInfo?.email || ''}
//           onChange={(e) =>
//             setSettings((p) => ({
//               ...p,
//               contactInfo: { ...p.contactInfo, email: e.target.value },
//             }))
//           }
//         />
//         <input
//           className="border p-2 w-full"
//           placeholder="Phone"
//           value={settings.contactInfo?.phone || ''}
//           onChange={(e) =>
//             setSettings((p) => ({
//               ...p,
//               contactInfo: { ...p.contactInfo, phone: e.target.value },
//             }))
//           }
//         />
//       </section>

//       {/* Company Info */}
//       <section className="border p-4 rounded-lg space-y-3">
//         <h2 className="font-semibold">Company Info</h2>
//         <input
//           className="border p-2 w-full"
//           placeholder="Company name"
//           value={settings.companyName || ''}
//           onChange={(e) => setSettings((p) => ({ ...p, companyName: e.target.value }))}
//         />
//         <textarea
//           className="border p-2 w-full"
//           placeholder="Description"
//           value={settings.description || ''}
//           onChange={(e) => setSettings((p) => ({ ...p, description: e.target.value }))}
//         />
//         <input
//           className="border p-2 w-full"
//           placeholder="Copyright text"
//           value={settings.copyrightText || ''}
//           onChange={(e) => setSettings((p) => ({ ...p, copyrightText: e.target.value }))}
//         />
//       </section>

//       {/* Social Links */}
//       <section className="border p-4 rounded-lg space-y-3">
//         <h2 className="font-semibold">Social Links</h2>
//         {settings.socialLinks?.map((link, i) => (
//           <div key={i} className="flex gap-2">
//             <select
//               className="border p-2"
//               value={link.platform}
//               onChange={(e) => {
//                 const updated = [...settings.socialLinks];
//                 updated[i] = { ...updated[i], platform: e.target.value };
//                 setSettings((p) => ({ ...p, socialLinks: updated }));
//               }}
//             >
//               <option value="facebook">Facebook</option>
//               <option value="instagram">Instagram</option>
//               <option value="linkedin">LinkedIn</option>
//               <option value="twitter">Twitter</option>
//               <option value="youtube">YouTube</option>
//             </select>
//             <input
//               className="border p-2 flex-1"
//               placeholder="URL"
//               value={link.url}
//               onChange={(e) => {
//                 const updated = [...settings.socialLinks];
//                 updated[i] = { ...updated[i], url: e.target.value };
//                 setSettings((p) => ({ ...p, socialLinks: updated }));
//               }}
//             />
//             <button
//               onClick={() =>
//                 setSettings((p) => ({
//                   ...p,
//                   socialLinks: p.socialLinks.filter((_, idx) => idx !== i),
//                 }))
//               }
//               className="bg-red-600 text-white px-3 rounded"
//             >
//               ×
//             </button>
//           </div>
//         ))}
//         <button
//           onClick={() =>
//             setSettings((p) => ({
//               ...p,
//               socialLinks: [
//                 ...(p.socialLinks || []),
//                 { platform: 'facebook', url: '', isActive: true },
//               ],
//             }))
//           }
//           className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
//         >
//           + Add Social Link
//         </button>
//       </section>

//       <button
//         onClick={saveSettings}
//         disabled={saving}
//         className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50"
//       >
//         {saving ? 'Saving...' : 'Save Settings'}
//       </button>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getAuthToken } from '@/utils/SessionHelper';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export default function FooterSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState({});
  const [deleteModal, setDeleteModal] = useState(null); // { imageId } or null
  const [deleting, setDeleting] = useState(false);

  const headers = () => ({ Authorization: `Bearer ${getAuthToken()}` });

  // ============ LOAD SETTINGS ============
  useEffect(() => {
    fetch(`${API}/footer-settings`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setSettings(res.data);
        else toast.error('Failed to load footer settings');
      })
      .catch(() => toast.error('Failed to load footer settings'));
  }, []);

  // ============ UPLOAD LOGO ============
  const uploadLogo = async (type, file) => {
    setUploading((s) => ({ ...s, [type]: true }));
    const fd = new FormData();
    fd.append('logo', file);

    const loadingToast = toast.loading(`Uploading ${type} logo...`);
    try {
      const res = await fetch(`${API}/footer-settings/upload/${type}-logo`, {
        method: 'POST',
        headers: headers(),
        body: fd,
      });
      const data = await res.json();

      if (data.success) {
        setSettings((p) => ({ ...p, [`${type}Logo`]: data.data }));
        toast.success(
          `${type === 'navbar' ? 'Footer/Navbar' : 'Navbar'} logo uploaded`,
          { id: loadingToast }
        );
      } else {
        toast.error(data.message || 'Upload failed', { id: loadingToast });
      }
    } catch (err) {
      toast.error('Upload failed', { id: loadingToast });
    } finally {
      setUploading((s) => ({ ...s, [type]: false }));
    }
  };

  // ============ UPLOAD GALLERY ============
  const uploadGallery = async (files) => {
    setUploading((s) => ({ ...s, gallery: true }));
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append('images', f));

    const loadingToast = toast.loading(`Uploading ${files.length} image(s)...`);
    try {
      const res = await fetch(`${API}/footer-settings/upload/gallery`, {
        method: 'POST',
        headers: headers(),
        body: fd,
      });
      const data = await res.json();

      if (data.success) {
        setSettings((p) => ({ ...p, galleryImages: data.data }));
        toast.success(`${files.length} image(s) uploaded`, { id: loadingToast });
      } else {
        toast.error(data.message || 'Upload failed', { id: loadingToast });
      }
    } catch (err) {
      toast.error('Upload failed', { id: loadingToast });
    } finally {
      setUploading((s) => ({ ...s, gallery: false }));
    }
  };

  // ============ DELETE GALLERY IMAGE ============
  const confirmDeleteGalleryImage = (imageId) => {
    setDeleteModal({ imageId });
  };

  const executeDeleteGalleryImage = async () => {
    if (!deleteModal) return;
    setDeleting(true);

    const loadingToast = toast.loading('Deleting image...');
    try {
      const res = await fetch(`${API}/footer-settings/gallery/${deleteModal.imageId}`, {
        method: 'DELETE',
        headers: headers(),
      });
      const data = await res.json();

      if (data.success) {
        setSettings((p) => ({ ...p, galleryImages: data.data }));
        toast.success('Image deleted', { id: loadingToast });
        setDeleteModal(null);
      } else {
        toast.error(data.message || 'Delete failed', { id: loadingToast });
      }
    } catch (err) {
      toast.error('Delete failed', { id: loadingToast });
    } finally {
      setDeleting(false);
    }
  };

  // ============ SAVE SETTINGS ============
  const saveSettings = async () => {
    setSaving(true);
    const loadingToast = toast.loading('Saving settings...');
    try {
      const res = await fetch(`${API}/footer-settings`, {
        method: 'PUT',
        headers: { ...headers(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactInfo: settings.contactInfo,
          socialLinks: settings.socialLinks,
          companyName: settings.companyName,
          description: settings.description,
          copyrightText: settings.copyrightText,
          discoverLinks: settings.discoverLinks,
          informationLinks: settings.informationLinks,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSettings(data.data);
        toast.success('Settings saved successfully', { id: loadingToast });
      } else {
        toast.error(data.message || 'Save failed', { id: loadingToast });
      }
    } catch (err) {
      toast.error('Save failed', { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="p-6 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#041367] rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading settings...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Toast container — scoped to this page */}
      <Toaster position="top-right" />

      <div className="p-6 max-w-4xl mx-auto space-y-8 pb-20">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Footer Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage logos, gallery, contact info, and social links for the site footer.
          </p>
        </div>

        {/* ============ FOOTER & TRANSPARENT NAVBAR LOGO ============ */}
        <section className="border border-gray-200 p-5 rounded-lg bg-white">
          <h2 className="font-semibold text-gray-900">
            Footer and Transparent Navbar Logo
          </h2>
          <p className="text-xs text-gray-400 mt-1 mb-3">
            Light color logo for dark background
          </p>

          {settings.navbarLogo?.url ? (
            <div className="inline-block p-4 bg-gray-900 rounded mb-3">
              <img
                src={settings.navbarLogo.url}
                alt="footer transparent navbar logo"
                className="h-16 object-contain"
              />
            </div>
          ) : (
            <p className="text-xs text-gray-400 mb-3 italic">No logo uploaded</p>
          )}

          <div>
            <input
              type="file"
              accept="image/*"
              id="upload-navbar"
              className="hidden"
              onChange={(e) =>
                e.target.files[0] && uploadLogo('navbar', e.target.files[0])
              }
            />
            <label
              htmlFor="upload-navbar"
              className={`inline-block cursor-pointer bg-[#041367] text-white text-sm px-4 py-2 rounded hover:bg-[#0f2b6e] transition ${
                uploading.navbar ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              {uploading.navbar ? 'Uploading...' : 'Choose File'}
            </label>
          </div>
        </section>

        {/* ============ NAVBAR LOGO ============ */}
        <section className="border border-gray-200 p-5 rounded-lg bg-white">
          <h2 className="font-semibold text-gray-900">Navbar Logo</h2>
          <p className="text-xs text-gray-400 mt-1 mb-3">
            Deep color logo for light background
          </p>

          {settings.bannerLogo?.url ? (
            <div className="inline-block p-4 bg-gray-50 rounded mb-3 border border-gray-200">
              <img
                src={settings.bannerLogo.url}
                alt="navbar logo"
                className="h-16 object-contain"
              />
            </div>
          ) : (
            <p className="text-xs text-gray-400 mb-3 italic">No logo uploaded</p>
          )}

          <div>
            <input
              type="file"
              accept="image/*"
              id="upload-banner"
              className="hidden"
              onChange={(e) =>
                e.target.files[0] && uploadLogo('banner', e.target.files[0])
              }
            />
            <label
              htmlFor="upload-banner"
              className={`inline-block cursor-pointer bg-[#041367] text-white text-sm px-4 py-2 rounded hover:bg-[#0f2b6e] transition ${
                uploading.banner ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              {uploading.banner ? 'Uploading...' : 'Choose File'}
            </label>
          </div>
        </section>

        {/* ============ GALLERY ============ */}
        <section className="border border-gray-200 p-5 rounded-lg bg-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">
              Gallery ({settings.galleryImages?.length || 0}/6)
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            {settings.galleryImages?.map((img) => (
              <div key={img._id} className="relative group">
                <img
                  src={img.url}
                  alt={img.alt || 'gallery'}
                  className="w-full h-24 object-cover rounded border border-gray-200"
                />
                <button
                  onClick={() => confirmDeleteGalleryImage(img._id)}
                  className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {(settings.galleryImages?.length || 0) < 6 && (
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                id="upload-gallery"
                className="hidden"
                onChange={(e) =>
                  e.target.files.length && uploadGallery(e.target.files)
                }
              />
              <label
                htmlFor="upload-gallery"
                className={`inline-block cursor-pointer bg-[#041367] text-white text-sm px-4 py-2 rounded hover:bg-[#0f2b6e] transition ${
                  uploading.gallery ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                {uploading.gallery ? 'Uploading...' : 'Upload Images'}
              </label>
            </div>
          )}
        </section>

        {/* ============ CONTACT ============ */}
        <section className="border border-gray-200 p-5 rounded-lg bg-white space-y-3">
          <h2 className="font-semibold text-gray-900">Contact Info</h2>
          <input
            className="border border-gray-300 rounded p-2 w-full text-sm"
            placeholder="Address line 1"
            value={settings.contactInfo?.address?.line1 || ''}
            onChange={(e) =>
              setSettings((p) => ({
                ...p,
                contactInfo: {
                  ...p.contactInfo,
                  address: { ...p.contactInfo.address, line1: e.target.value },
                },
              }))
            }
          />
          <input
            className="border border-gray-300 rounded p-2 w-full text-sm"
            placeholder="Address line 2"
            value={settings.contactInfo?.address?.line2 || ''}
            onChange={(e) =>
              setSettings((p) => ({
                ...p,
                contactInfo: {
                  ...p.contactInfo,
                  address: { ...p.contactInfo.address, line2: e.target.value },
                },
              }))
            }
          />
          <input
            className="border border-gray-300 rounded p-2 w-full text-sm"
            placeholder="Email"
            value={settings.contactInfo?.email || ''}
            onChange={(e) =>
              setSettings((p) => ({
                ...p,
                contactInfo: { ...p.contactInfo, email: e.target.value },
              }))
            }
          />
          <input
            className="border border-gray-300 rounded p-2 w-full text-sm"
            placeholder="Phone"
            value={settings.contactInfo?.phone || ''}
            onChange={(e) =>
              setSettings((p) => ({
                ...p,
                contactInfo: { ...p.contactInfo, phone: e.target.value },
              }))
            }
          />
        </section>

        {/* ============ COMPANY INFO ============ */}
        <section className="border border-gray-200 p-5 rounded-lg bg-white space-y-3">
          <h2 className="font-semibold text-gray-900">Company Info</h2>
          <input
            className="border border-gray-300 rounded p-2 w-full text-sm"
            placeholder="Company name"
            value={settings.companyName || ''}
            onChange={(e) =>
              setSettings((p) => ({ ...p, companyName: e.target.value }))
            }
          />
          <textarea
            className="border border-gray-300 rounded p-2 w-full text-sm"
            placeholder="Description"
            rows={3}
            value={settings.description || ''}
            onChange={(e) =>
              setSettings((p) => ({ ...p, description: e.target.value }))
            }
          />
          <input
            className="border border-gray-300 rounded p-2 w-full text-sm"
            placeholder="Copyright text"
            value={settings.copyrightText || ''}
            onChange={(e) =>
              setSettings((p) => ({ ...p, copyrightText: e.target.value }))
            }
          />
        </section>

        {/* ============ SOCIAL LINKS ============ */}
        <section className="border border-gray-200 p-5 rounded-lg bg-white space-y-3">
          <h2 className="font-semibold text-gray-900">Social Links</h2>

          {settings.socialLinks?.map((link, i) => (
            <div key={i} className="flex gap-2 items-center">
              <select
                className="border border-gray-300 rounded p-2 text-sm"
                value={link.platform}
                onChange={(e) => {
                  const updated = [...settings.socialLinks];
                  updated[i] = { ...updated[i], platform: e.target.value };
                  setSettings((p) => ({ ...p, socialLinks: updated }));
                }}
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="youtube">YouTube</option>
              </select>

              <input
                className="border border-gray-300 rounded p-2 flex-1 text-sm"
                placeholder="https://..."
                value={link.url}
                onChange={(e) => {
                  const updated = [...settings.socialLinks];
                  updated[i] = { ...updated[i], url: e.target.value };
                  setSettings((p) => ({ ...p, socialLinks: updated }));
                }}
              />

              <button
                onClick={() =>
                  setSettings((p) => ({
                    ...p,
                    socialLinks: p.socialLinks.filter((_, idx) => idx !== i),
                  }))
                }
                className="bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded flex items-center justify-center text-lg"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}

          <button
            onClick={() =>
              setSettings((p) => ({
                ...p,
                socialLinks: [
                  ...(p.socialLinks || []),
                  { platform: 'facebook', url: '', isActive: true },
                ],
              }))
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm"
          >
            + Add Social Link
          </button>
        </section>

        {/* ============ SAVE BUTTON ============ */}
        <div className="sticky bottom-4 bg-white border-t border-gray-100 pt-3 flex justify-end">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        {/* ============ DELETE CONFIRMATION MODAL ============ */}
        {deleteModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !deleting && setDeleteModal(null)}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  Delete this image?
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone. The image will be permanently
                  removed from Cloudinary and your gallery.
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setDeleteModal(null)}
                  disabled={deleting}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDeleteGalleryImage}
                  disabled={deleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
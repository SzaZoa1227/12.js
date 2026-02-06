const API = "https://surveys-5jvt.onrender.com/api/cars";
const maxLockID = 4;

const state = {
	cars: [],
	selectedId: null,
	editingId: null
};

const elements = {
	list: document.getElementById("car-list"),
	detail: document.getElementById("car-detail"),
	form: document.getElementById("car-form"),
	formTitle: document.getElementById("form-title"),
	formSubmit: document.getElementById("form-submit"),
	formCancel: document.getElementById("form-cancel"),
	inputModel: document.getElementById("model"),
	inputBrand: document.getElementById("brand"),
	inputYear: document.getElementById("year")
};

function debugConsole(message = "", type = "") {
	console.log(`%c${message}`, type === "error" ? "color: red; font-weight: bold;" : "color: green;");
}

async function fetchJson(url, options) {
	const response = await fetch(url, options);
	if (!response.ok) {
		const text = await response.text();
		throw new Error(text || `(${response.status})`);
	}
	return response.json();
}

async function getCars() {
	const data = await fetchJson(API);
	state.cars = Array.isArray(data) ? data : []; // itt van baj
}

async function getCarById(id) {
	return fetchJson(`${API}/${id}`);
}

async function createCar(newCar) {
	return fetchJson(API, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newCar)
	});
}

async function updateCar(id, carUpdate) {
	return fetchJson(`${API}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(carUpdate)
	});
}

async function deleteCar(id) {
	return fetchJson(`${API}/${id}`, {
		method: "DELETE"
	});
}

function isLocked(id) {
	return Number(id) <= maxLockID;
}

function renderList() {
	const items = [...state.cars];

	if (!items.length) {
		elements.list.innerHTML = "<p class=\"text-secondary\">Nincsenek kocsik</p>";
		return;
	}

	elements.list.innerHTML = items
		.map(car => {
			const locked = isLocked(car.id);
			return `
				<article class="card bg-body-tertiary border-0 shadow-sm" data-id="${car.id}">
					<div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
						<div>
							<h3 class="h6 mb-1">${car.model ?? "(nem adott meg)"}</h3>
							<p class="text-secondary mb-0">${car.brand ?? "(márka nélküli)"}${car.brand && car.year ? " • " : ""}${car.year ?? "(nincs évszám)"}</p>
						</div>
						<div class="d-flex flex-wrap gap-2">
							<button class="btn btn-sm btn-outline-secondary" data-action="view">Részletek</button>
							<button class="btn btn-sm btn-outline-primary" data-action="edit" ${locked ? "disabled" : ""} title="${locked ? "Az első 4 autó nem szerkeszthető" : ""}">Szerkesztés</button>
							<button class="btn btn-sm btn-outline-danger" data-action="delete" ${locked ? "disabled" : ""} title="${locked ? "Az első 4 autó nem törölhető" : ""}">Törlés</button>
						</div>
					</div>
				</article>
			`;
		})
		.join("");
}

function renderDetail(car) {
	if (!car) {
		elements.detail.innerHTML = "<p class=\"text-secondary\">Válassz egy autót a listából.</p>";
		return;
	}
	const rows = Object.entries(car)
		.map(([key, value]) => `
			<div class="d-flex justify-content-between gap-3 border-bottom border-secondary-subtle py-2">
				<span class="text-secondary text-capitalize small">${key}</span>
				<span class="fw-semibold">${value ?? ""}</span>
			</div>
		`)
		.join("");
	elements.detail.innerHTML = `<div>${rows}</div>`;
}

function setFormMode(mode, car = null) {
	state.editingId = mode === "edit" ? car?.id : null;
	elements.formTitle.textContent = mode === "edit" ? "Autó szerkesztése" : "Új autó";
	elements.formSubmit.textContent = mode === "edit" ? "Mentés" : "Hozzáadás";
	elements.formCancel.classList.toggle("d-none", mode !== "edit");
	elements.inputModel.value = car?.model ?? "";
	elements.inputBrand.value = car?.brand ?? "";
	elements.inputYear.value = car?.year ?? "";
}

async function loadAndRender() {
	try {
		await getCars();
		renderList();
		if (state.selectedId) {
			const car = await getCarById(state.selectedId);
			renderDetail(car);
		} else {
			renderDetail(null);
		}
	} catch (error) {
		debugConsole(error.message, "error");
	}
}

async function handleView(id) {
	try {
		state.selectedId = id;
		const car = await getCarById(id);
		renderDetail(car);
	} catch (error) {
		debugConsole(error.message, "error");
	}
}

async function handleEdit(id) {
	if (isLocked(id)) {
		debugConsole("Az első 4 autó nem szerkeszthető.", "error");
		return;
	}
	try {
		const car = await getCarById(id);
		setFormMode("edit", car);
		state.selectedId = id;
		renderDetail(car);
	} catch (error) {
		debugConsole(error.message, "error");
	}
}

async function handleDelete(id) {
	if (isLocked(id)) {
		debugConsole("Az első 4 autó nem törölhető.", "error");
		return;
	}
	if (!confirm("Biztosan törlöd ezt az autót?")) return;
	try {
		await deleteCar(id);
		if (state.selectedId === id) {
			state.selectedId = null;
			renderDetail(null);
		}
		await loadAndRender();
	} catch (error) {
		debugConsole(error.message, "error");
	}
}

elements.list.addEventListener("click", event => {
	const action = event.target?.dataset?.action;
	if (!action) return;
	const card = event.target.closest("[data-id]");
	const id = Number(card?.dataset?.id);
	if (!id) return;
	if (action === "view") handleView(id);
	if (action === "edit") handleEdit(id);
	if (action === "delete") handleDelete(id);
});
elements.form.addEventListener("submit", async event => {
	event.preventDefault();
	debugConsole("");

	const payload = {
		model: elements.inputModel.value.trim(),
		brand: elements.inputBrand.value.trim(),
		year: Number(elements.inputYear.value)
	};

	if (!payload.model || !payload.brand || !payload.year) {
		debugConsole("Minden mező kitöltése kötelező.", "error");
		return;
	}

	try {
		if (state.editingId) {
			if (isLocked(state.editingId)) {
				debugConsole("Az első 4 autó nem szerkeszthető.", "error");
				return;
			}
			await updateCar(state.editingId, { id: state.editingId, ...payload });
			await loadAndRender();
			await handleView(state.editingId);
			setFormMode("add");
		} else {
			const created = await createCar(payload);
			await loadAndRender();
			if (created?.id) {
				await handleView(created.id);
			}
		}
		elements.form.reset();
	} catch (error) {
		debugConsole(error.message, "error");
	}
});

elements.formCancel.addEventListener("click", () => {
	setFormMode("add");
	elements.form.reset();
});

document.addEventListener("DOMContentLoaded", async () => {
	setFormMode("add");
	renderDetail(null);
	await loadAndRender();
});